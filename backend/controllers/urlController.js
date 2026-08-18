const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const { client } = require('../config/redis');
const formatResponse = require('../utils/response');

// @desc    Create short URL
// @route   POST /url/create
// @access  Private
const createUrl = async (req, res, next) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json(formatResponse(false, 'Please provide an original URL'));
        }

        // Validate URL
        try {
            new URL(originalUrl);
        } catch (err) {
            return res.status(400).json(formatResponse(false, 'Invalid URL format'));
        }

        let shortCode;
        let isUnique = false;

        // Ensure unique short code
        while (!isUnique) {
            shortCode = nanoid(7);
            const existing = await Url.findOne({ shortCode });
            if (!existing) isUnique = true;
        }

        const url = await Url.create({
            originalUrl,
            shortCode,
            userId: req.user.id
        });

        // Add to cache (graceful fallback if Redis is down)
        try {
            if (client.isReady) {
                await client.setEx(`url:${shortCode}`, 3600, JSON.stringify(url));
            }
        } catch (err) {
            console.warn('Redis cache skip:', err.message);
        }

        res.status(201).json(formatResponse(true, 'URL shortened successfully', url));
    } catch (error) {
        next(error);
    }
};

// @desc    Get all URLs for user
// @route   GET /url/all
// @access  Private
const getUrls = async (req, res, next) => {
    try {
        const urls = await Url.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(formatResponse(true, 'URLs fetched successfully', urls));
    } catch (error) {
        next(error);
    }
};

// @desc    Search URLs
// @route   GET /url/search?q=
// @access  Private
const searchUrls = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json(formatResponse(false, 'Please provide a search query'));
        }

        const urls = await Url.find({
            userId: req.user.id,
            $or: [
                { originalUrl: { $regex: q, $options: 'i' } },
                { shortCode: { $regex: q, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.json(formatResponse(true, 'Search completed', urls));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete URL
// @route   DELETE /url/:id
// @access  Private
const deleteUrl = async (req, res, next) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json(formatResponse(false, 'URL not found'));
        }

        if (url.userId.toString() !== req.user.id) {
            return res.status(401).json(formatResponse(false, 'User not authorized'));
        }

        await Url.deleteOne({ _id: req.params.id });

        // Remove from cache
        try {
            if (client.isReady) {
                await client.del(`url:${url.shortCode}`);
            }
        } catch (err) {
            console.warn('Redis cache skip:', err.message);
        }

        res.json(formatResponse(true, 'URL deleted successfully', { id: req.params.id }));
    } catch (error) {
        next(error);
    }
};

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
const redirectUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        // Check cache
        let cachedUrl = null;
        try {
            if (client.isReady) {
                cachedUrl = await client.get(`url:${shortCode}`);
            }
        } catch (err) {
            console.warn('Redis cache skip:', err.message);
        }
        
        let url;
        if (cachedUrl) {
            url = JSON.parse(cachedUrl);
            
            // Asynchronously update clicks and lastAccessed
            Url.updateOne(
                { shortCode }, 
                { $inc: { clicks: 1 }, lastAccessed: new Date() }
            ).exec();
            
            // Update cache to reflect new click count
            try {
                if (client.isReady) {
                    url.clicks += 1;
                    url.lastAccessed = new Date();
                    await client.setEx(`url:${shortCode}`, 3600, JSON.stringify(url));
                }
            } catch (err) {
                console.warn('Redis cache update skip:', err.message);
            }
            
        } else {
            url = await Url.findOne({ shortCode });

            if (url) {
                url.clicks += 1;
                url.lastAccessed = new Date();
                await url.save();
                
                try {
                    if (client.isReady) {
                        await client.setEx(`url:${shortCode}`, 3600, JSON.stringify(url));
                    }
                } catch (err) {
                    console.warn('Redis cache update skip:', err.message);
                }
            }
        }

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json(formatResponse(false, 'URL not found'));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUrl,
    getUrls,
    searchUrls,
    deleteUrl,
    redirectUrl
};

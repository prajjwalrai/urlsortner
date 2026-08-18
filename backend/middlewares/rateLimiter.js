const rateLimit = require('express-rate-limit');
const formatResponse = require('../utils/response');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json(formatResponse(false, 'Too many requests, please try again later.'));
    }
});

module.exports = rateLimiter;

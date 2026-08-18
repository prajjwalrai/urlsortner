const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { client } = require('../config/redis');
const formatResponse = require('../utils/response');

router.get('/', async (req, res) => {
    try {
        const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
        const redisStatus = client.isReady ? 'Connected' : 'Disconnected';
        
        const healthData = {
            uptime: process.uptime(),
            mongoDB: mongoStatus,
            redis: redisStatus,
            timestamp: Date.now()
        };

        const isHealthy = mongoStatus === 'Connected' && redisStatus === 'Connected';

        res.status(isHealthy ? 200 : 503).json(formatResponse(isHealthy, 'Health check', healthData));
    } catch (error) {
        res.status(500).json(formatResponse(false, 'Health check failed', error.message));
    }
});

module.exports = router;

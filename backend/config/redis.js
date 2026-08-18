const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Redis Connected');
    } catch (err) {
        console.error('Failed to connect to Redis', err);
    }
};

module.exports = { client, connectRedis };

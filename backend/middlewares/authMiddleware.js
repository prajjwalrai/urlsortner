const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/response');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json(formatResponse(false, 'Not authorized, user not found'));
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json(formatResponse(false, 'Not authorized, token failed'));
        }
    } else {
        return res.status(401).json(formatResponse(false, 'Not authorized, no token'));
    }
};

module.exports = { protect };

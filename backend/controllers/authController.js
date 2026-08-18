const jwt = require('jsonwebtoken');
const User = require('../models/User');
const formatResponse = require('../utils/response');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json(formatResponse(false, 'Please add all fields'));
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json(formatResponse(false, 'User already exists'));
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json(formatResponse(true, 'User registered successfully', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }));
        } else {
            res.status(400).json(formatResponse(false, 'Invalid user data'));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json(formatResponse(true, 'User logged in successfully', {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }));
        } else {
            res.status(401).json(formatResponse(false, 'Invalid credentials'));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};

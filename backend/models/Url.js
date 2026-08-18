const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Please add an original URL']
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index for faster search
urlSchema.index({ userId: 1, shortCode: 1 });
urlSchema.index({ userId: 1, originalUrl: 1 });

module.exports = mongoose.model('Url', urlSchema);

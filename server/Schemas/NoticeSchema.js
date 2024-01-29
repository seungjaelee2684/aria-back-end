const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    noticeId: {
        type: String,
        required: true,
        trim: true
    },
    englishtitle: {
        type: String,
        required: true,
        trim: true
    },
    chinesetitle: {
        type: String,
        required: true,
        trim: true
    },
    japanesetitle: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notice_info', noticeSchema);
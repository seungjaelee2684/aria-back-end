const mongoose = require('mongoose');

const mentorsNameSchema = new mongoose.Schema({
    mentorsId: {
        type: String,
        required: true,
        trim: true,
    },
    englishname: {
        type: String,
        required: true,
        trim: true,
    },
    chinesename: {
        type: String,
        required: true,
        trim: true,
    },
    japanesename: {
        type: String,
        required: true,
        trim: true,
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
    },
    nation: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('mentor_name', mentorsNameSchema);
const mongoose = require('mongoose');

const mentorsImageSchema = new mongoose.Schema({
    mentorsId: {
        type: String,
        required: true,
        trim: true
    },
    slideimage: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    curriculum: {
        type: {
            english: {
                type: String,
                required: true,
                trim: true
            },
            chinese: {
                type: String,
                required: true,
                trim: true
            },
            japanese: {
                type: String,
                required: true,
                trim: true
            },
            korean: {
                type: String,
                required: true,
                trim: true
            },
        },
        required: true
    },
    mentorsId: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('mentor_image', mentorsImageSchema);
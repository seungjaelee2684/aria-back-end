const mongoose = require('mongoose');

const mentorsNameSchema = new mongoose.Schema({
    mentorsId: {
        type: String,
        required: true,
        trim: true,
    },
    mentorInfoData: {
        type: {
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
        },   
        required: true
    },
    SNS: {
        type: {
            home: {
                type: String,
                required: false,
                trim: true
            },
            youtube: {
                type: String,
                required: false,
                trim: true
            },
            twitter: {
                type: String,
                required: false,
                trim: true
            },
            instagram: {
                type: String,
                required: false,
                trim: true
            },
            artstation: {
                type: String,
                required: false,
                trim: true
            },
            pixiv: {
                type: String,
                required: false,
                trim: true
            },
        },
        required: true,
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
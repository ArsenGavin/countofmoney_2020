const mongoose = require("mongoose");

const Articles = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    source: {
        type: String,
    },
    urlPage: {
        type: String,
    },
    urlPhoto: {
        type: String,
    },
    date: {
        type: Number,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = mongoose.model('articles', Articles);

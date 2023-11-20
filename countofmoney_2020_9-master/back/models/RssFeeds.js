const mongoose = require("mongoose");

const RssFeeds = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = mongoose.model('rssfeeds', RssFeeds);

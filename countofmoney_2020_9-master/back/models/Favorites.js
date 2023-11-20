const mongoose = require("mongoose");

const Favorites = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    Crypto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cryptos'
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = mongoose.model('favorites', Favorites);

const mongoose = require("mongoose");

const Cryptos = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    currentPrice: {
        type: Number
    },
    openingPrice: {
        type: Number
    },
    lowPrice: {
        type: Number
    },
    highestPrice: {
        type: Number
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = mongoose.model('cryptos.js', Cryptos);

const mongoose = require('mongoose');

const Administration = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    article : {
        type: Number,
        required: true,
    },
    crypto: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('administration', Administration);
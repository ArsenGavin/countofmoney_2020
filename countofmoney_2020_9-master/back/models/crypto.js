const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { bool } = require('joi');

const Crypto = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    idcrypto: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    enabled: {
        type: Boolean,
        default: false,
    }
})

function validateCrypto(crypto) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        idcrypto: Joi.string().min(3).max(255).required()
    });
    return schema.validate(crypto);
}

module.exports = mongoose.model('crypto', Crypto);
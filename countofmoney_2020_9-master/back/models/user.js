const Joi = require('joi');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        default: 'User',
        enum: ["User", "Admin"]
    },
    currency: {
        type: String,
        minlength: 3,
        maxlength: 4,
        default: "usd"
    },
    favorites: {
        type: [String],
        default: []
    },
    profile: {
        type: String,
        default: "basic"
    }
});



/*User.pre(
    'save',
    async function(next) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });
        if (this.isNew) {
            const user = this;
            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
        }
        next();
    }
);*/

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

module.exports = mongoose.model('user', User);

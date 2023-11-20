const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const router = new express.Router();
const Crypto = require("../models/crypto");
const Favorites = require("../models/Favorites");

router.post('/createFavorite', (req, res) => {
    Favorites.create(req.body).then(result => {
        res.status(200).send(result);
    }).catch(err => res.status(500).send(err));
});

module.exports = router;

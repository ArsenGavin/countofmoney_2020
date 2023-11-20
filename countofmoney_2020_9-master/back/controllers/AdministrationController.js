const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const router = new express.Router();
const Administration = require("../models/Administration");
const {checkAuthAdmin} = require('../config/middleware');

dotenv.config();

router.get(`/`, async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    Administration.find({name: 'config'}, function(err, found) {
        if (err) {
            return res.status(500).send({message: "Internal Server Error."})
        }
        else if (found) {
            var response = {article: found[0].article, crypto: found[0].crypto};
            return res.status(200).send(response);
        }
        else {
            return res.status(404).send({message: "config not found"});
        }
    })
})

router.put(`/edit`, checkAuthAdmin, async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    await Administration.findOneAndUpdate({name: "config"}, req.body);
    return res.status(200).send({message: "ok"});
})

module.exports = router;

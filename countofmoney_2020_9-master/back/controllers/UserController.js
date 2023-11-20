const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.status(200).send("Users");
});

router.put('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, function (err, docs) {
        if (docs) {
            docs.favorites = req.body.favorite;

            docs.save(function (err) {
                if (err) {
                    res.status(400).send("Save error");
                }
                res.status(200).send(docs);
            });
        } else if (err) {
            res.status(500).send(err);
        } else {
            res.status(500).send("Internal server error");
        }
    });
});

module.exports = router;

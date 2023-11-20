const express = require('express');
let Parser = require('rss-parser');
let parser = new Parser();
const RssFeeds = require("../models/RssFeeds");

const router = new express.Router();

router.get('/', (req, res) => {
    RssFeeds.find().then(result => {
        res.status(200).send(result);
    }).catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
    RssFeeds.findOneAndUpdate({_id: req.body.id}, req.body, {upsert: true, setDefaultsOnInsert: true}, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send({message: "Internal Server Error"});
        } else {
            res.status(201).send({message: "success"});
        }
    });
});

router.put('/:id', (req, res) => {
    RssFeeds.findOne({_id: req.params.id}, function (err, docs) {
        if (docs) {
            docs.enabled = req.body.enabled;

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

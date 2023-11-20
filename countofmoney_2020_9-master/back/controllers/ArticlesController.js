const express = require('express');
let Parser = require('rss-parser');
let parser = new Parser();
const RssFeeds = require("../models/RssFeeds");

const router = new express.Router();

router.get('/', (req, res) => {

    //query limit
    //keyword
    //rss feed
    let promises = [];
    let resultSend = [];
    // il faut pouvoir desactiver ou activer des fluxs rss
    RssFeeds.find({enabled: true}).then(result => {
        result.forEach(element => {
            promises.push(parser.parseURL(element.url).then(article => {
                resultSend.push(article.items);
            }));
        });
        Promise.all(promises).then(promisesResult => {
            res.status(200).send(resultSend);
        });
    });
    /*const URLFeeds = [
        'https://www.coindesk.com/feed',
        'https://cryptopotato.com/feed', // pas ouf
        'https://coincolony.net/feed/',
        'https://minergate.com/blog/feed/',
        'https://www.cryptoninjas.net/feed/',
        'https://www.financemagnates.com/cryptocurrency/feed/',
        'https://www.reddit.com/r/CryptoCurrency/top/.rss?format=xml'
    ];*/

    /*parser.parseURL('https://cryptopotato.com/feed').then(result => {
        console.log(result);
        res.status(200).send(result);
    })*/
});

router.post('/rss', (req, res) => {
    RssFeeds.create([req.body], function (err) {
        if (err) {
            res.status(500).send({message: "Internal Server Error"});
        }
        res.status(201).send({message: "Crypto added with success"});
    });
});

module.exports = router;

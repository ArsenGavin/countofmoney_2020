const express = require('express');
const axios = require('axios');
const passport = require('passport');

const router = express.Router();


/* //first call to authorize your front on github
router.get('/github', async(req, res) => {
    const request = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_TOKEN}&scope=user`
    res.send({ url: request })
})


// if the first call as successful, on the then of your call, call thisto get your github token for logged in on your pannel
router.post('/access/github', async(req, res) => {
    const request = 'https://github.com/login/oauth/access_token';

    //console.log(req.body.code);
    await axios(request, {
            method: 'POST',
            data: {
                client_id: process.env.GITHUB_TOKEN,
                client_secret: process.env.GITHUB_TOKEN_SECRET,
                code: req.body.code
            }
        })
        .then(r => {
            //console.log(r.data.split('&'));
            const fragment = r.data.split('&');
            const code = fragment[0].split('=');
            //console.log(code[1]);
            res.send({ github_token: code[1] })
        })
        .catch(err => {
            res.send('error');
        })
}) */

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
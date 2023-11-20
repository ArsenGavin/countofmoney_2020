const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

const passport = require("passport");
const request = require("request");

const router = new express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            isAuth: true,
            user: req.user
        })
    } else {
        res.send({
            isAuth: false
        })
    }
});

router.put('/', async (req, res) => {
    if (req.user != undefined && req.user.role == 'User')
        return res.status(401).send("your are not authorized to change your role");
    await User.findOneAndUpdate({ email: req.user.email }, req.body);
    return res.status(200).send({message: "your modification are validated"});

});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (user.profile === "basic" && !user.password) {
            console.log("error");
        }
        if (info) {
            return res.status(401).send(info)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth');
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.send({
                data: user
            });
        })
    })(req, res, next);
});

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    User.findOne({ $or: [{ 'email': email }, { 'name': name }] }, function (err, foundUser) {
        if (!password) {
            return res.status(400).send({ message: "You need a password to register" })
        }
        if (err) {
            return res.status(500).send({ message: "Internal server error" });
        } else if (foundUser) {
            return res.status(409).send({ message: "User already exist" });
        } else if (email.length < 5 || password.length < 5 || name.length < 5) {
            return res.status(400).send({ message: "All parameters must have a length of 5 minimum" });
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, null, function (err, passwordHash) {
                    if (err) {
                        console.log(err)
                    }
                    User.create([{
                        email,
                        password: passwordHash,
                        name
                    }], function (err) {
                        if (err) {
                            console.log("err", err);
                            res.status(500).send({ message: "Internal server error: " + err })
                        } else {
                            res.status(201).send({ message: "User created with success" });
                        }
                    })
                });
            });
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ message: "Successfully logout" });
});

module.exports = router;
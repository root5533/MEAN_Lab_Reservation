const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        university: req.body.university,
        degrees: req.body.degrees,
        contact: req.body.contact
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    })
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    msg: 'Succesfully signed in'
                })
            } else {
                res.json({
                    success: false,
                    msg: "Wrong Password"
                })
            }
        })
    })
});

router.get('/profile',  passport.authenticate('jwt', {session: false}),  (req, res, next) => {
    res.json({
        user: req.user
    });
});

router.get('', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Unable to retrieve users'
            })
        } else {
            res.json({
                success: true,
                users: users,
                msg: 'Succesfully retrieved users'
            })
        }
    })
})

module.exports = router;
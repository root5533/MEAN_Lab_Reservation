const express = require('express');
const router = express.Router();
const config = require('../config/database');

router.post('/authenticate', (req, res, next) => {
    const admin = {
        username: req.body.username,
        password: req.body.password
    }
    if (admin.username === 'admin') {
        if (admin.password === 'admin') {
            res.json({
                success: true,
                msg: 'Successfully logged in as admin'
            })
        } else {
            res.json({
                success: false,
                msg: 'Invalid password'
            })
        }
    } else {
        res.json({
            success: false,
            msg: 'Invalid username'
        })
    }
})



module.exports = router;
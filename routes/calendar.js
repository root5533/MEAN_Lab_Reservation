const express = require('express');
const router = express.Router();
const Lab = require('../models/lab');
const config = require('../config/database');
const passport = require('passport');
const Event = require('../models/event');
const eventapi = require('./api/event');

router.use('/event', eventapi);

router.get('/labs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Lab.getLabs((err, labs) => {
        if (err) {
            throw err;
        }
        res.json({
            labs: labs
        })
    })
});

router.post('/lab', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const lab = new Lab({
        name: req.body.name,
        description: req.body.description,
        capacity: req.body.capacity
    });
    Lab.addLab(lab, (err, lab) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add new lab'
            })
        } else {
            res.json({
                success: true,
                msg: 'Successfully added new lab'
            })
        }
    })
});

router.delete('/lab/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const lab_id = req.params.id;
        await Lab.deleteLab(lab_id, (err, lab) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Unable to delete lab'
                })
            } else {
                res.json({
                    success: true,
                    msg: 'Succesfully deleted lab'
                })
            }
        });
    } catch (e) {
        res.json({
            success: false,
            msg: 'Unable to delete lab'
        })
    }
})

router.put('/lab', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const lab_id = req.body.id;
        const updateLab = {
            name: req.body.name,
            description: req.body.description,
            capacity: req.body.capacity
        }
        await Lab.updateLab(lab_id, updateLab, (err, lab) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Unable to update lab'
                })
            } else {
                res.json({
                    success: true,
                    msg: 'Successfully updated lab'
                })
            }
        })
    } catch (e) {
        res.json({
            success: false,
            msg: 'An error occured when updating lab'
        })
    }
})

module.exports = router;

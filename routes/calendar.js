const express = require('express');
const router = express.Router();
const Lab = require('../models/lab');
const config = require('../config/database');
const passport = require('passport');
const Event = require('../models/event');

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

router.post('/labs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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

router.get('/events/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.params.id;
    Event.getEventsFromLabId(id, (err, events) => {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true,
                data: events,
                msg: 'Successfully received events'
            })
        }
    })
})

router.get('/user_events/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const user_id = req.user._id;
    const lab_id = req.params.id;
    Event.getUserEventsFromLabId(user_id, lab_id, (err, events) => {
        if (err) {
            throw err;
        } else {
            res.json({
                success: true,
                data: events,
                msg: 'Succesfully received user events'
            })
        }
    })
})

router.post('/event', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.user._id;
    const newEvent = new Event({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description,
        user_id: userId,
        lab_id: req.body.lab_id
    });
    Event.addNewEvent(newEvent, (err, event) => {
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured when adding new reservation'
            });
        } else {
            res.json({
                success: true,
                event: event,
                msg: 'Successfully added new reservation'
            });
        }
    });
})

router.post('/event_validate', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const date = req.body.event_date;
    const lab_id = req.body.lab_id;
    Event.getEventsFromDate(date, lab_id, (err, events) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to retrieve events for this date'
            })
        } else {
            res.json({
                success: true,
                data: events,
                msg: 'Successfully retrieved events from date'
            })
        }
    })
})

router.put('/event', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const eventId = req.body.id;
    const userId = req.user._id;
    if (userId === req.body.userId) {
        res.json({
            success: false,
            msg: 'You cannot update this reservation'
        })
    } else {
        const updateEvent = new Event({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description,
        });
        try {
            Event.updateEvent(eventId, updateEvent, (err, event) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Could not update your reservation'
                    })
                } else {
                    res.json({
                        success: true,
                        msg: 'Successfully updated your reservation'
                    })
                }
            });
        } catch(e) {
            throw e;
        }
    }
})

router.delete('/event/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const eventId = req.params.id;
        // await Event.deleteEvent(id, (err, event) => {
        //     if (!event) {
                // res.json({
                //     success: false,
                //     msg: 'An error occured when deleting reservation'
                // })
        //     } else {
                // res.json({
                //     success: true,
                //     msg: 'Successfully deleted reservation'
                // })
        //     }
        // })
        const event = await Event.deleteEvent(eventId);
        if (event) {
            res.json({
                success: true,
                msg: 'Successfully deleted reservation'
            })
        } else {
            res.json({
                success: false,
                msg: 'An error occured when deleting reservation'
            })
        }
    } catch(e) {
        throw e;
    }
    
})

module.exports = router;

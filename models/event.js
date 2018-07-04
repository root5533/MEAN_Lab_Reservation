const mongoose = require('mongoose');
const addDays = require('date-fns/add_days');
const moment = require('moment');
moment().format();

const EventSchema = mongoose.Schema({
    title: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    description: {
        type: String
    },
    user_id: {
        type: String
    },
    lab_id: {
        type: String
    }
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.getEventsFromLabId = async function(id, callback) {
    const query = {
        lab_id: id
    };
    await Event.find(query, callback);
}

module.exports.getUserEventsFromLabId = async function(user, lab, callback) {
    const query = {
        lab_id: lab,
        user_id: user,
        start: {
            $gte: new Date()
        }
    }
    await Event.find(query, callback);
}

module.exports.addNewEvent = async function(newEvent, callback) {
    try {
        await newEvent.save(callback);
    } catch(e) {
        throw e;
    }
}

module.exports.updateEvent = function(id, updateEvent, callback) {
    Event.findById(id).then((event) => {
        if (event) {
            event.title = updateEvent.title,
            event.description = updateEvent.description,
            event.start = updateEvent.start,
            event.end = updateEvent.end,
            event.save(callback);
        }
    })
}

module.exports.deleteEvent = async function(id) {
    try {
        return await Event.remove({_id: id});
    } catch(e) {
        throw e;
    }
}

module.exports.getEventsFromDate = async function(date, lab_id, callback) {
    const query = {
        start: {
            "$gte": date,
            "$lt": addDays(date, 1)
        },
        lab_id: lab_id
    }
    try {
        await Event.find(query, callback);
    } catch(e) {
        throw e;
    }
}

module.exports.getEventsForReport = async function(from, to, lab_id, callback) {
    const query = {
        start: {
            "$gte": from,
            "$lt": to
        },
        lab_id: lab_id
    }
    try {
        await Event.find(query, callback);
    } catch(e) {
        throw e;
    }
}

module.exports.getAllEventsToday = function(callback) {
    const from = moment().startOf('day').toDate();
    const to = moment().endOf('day').toDate();
    const query = {
        start: {
            "$gte": from,
            "$lt": to
        }
    }
    try {
        Event.find(query, callback);
    } catch (e) {
        throw e;
    }
}
const mongoose = require('mongoose');
const config = require('../config/database');

const LabSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    capacity: {
        type: Number
    }
});

const Lab = module.exports = mongoose.model('Lab', LabSchema);

module.exports.getLabs = async function(callback) {
    await Lab.find({}, callback);
}

module.exports.addLab = function(newLab, callback) {
    newLab.save(callback);
}
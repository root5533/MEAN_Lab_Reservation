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

module.exports.deleteLab = async function(lab_id, callback) {
    try {
        return await Lab.remove({_id : lab_id}, callback);
    } catch (e) {
        throw e;
    }
}

module.exports.updateLab = async function(id, updateLab, callback) {
    try {
        await Lab.findById(id).then((lab) => {
            if (lab) {
                lab.name = updateLab.name;
                lab.description = updateLab.description;
                lab.capacity = updateLab.capacity
                lab.save(callback);
            }
        })
    } catch (e) {
        throw e;
    }
}

const mongoose = require('mongoose');


const db = require('../config/db');

const { Schema } = mongoose;

const deviceSchema = new Schema({
    "name": {
        type: String,
    },
    "type": {
        type: String,
    },
    }
);

const DeviceModel = db.model('device',deviceSchema);

module.exports = DeviceModel;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const incidentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    resolved: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
});
const incidentModel = mongoose.model('Incident', incidentSchema);

module.exports = incidentModel;
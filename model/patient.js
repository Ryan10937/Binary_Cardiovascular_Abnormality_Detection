const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const patientSchema = new Schema({
    patient_name: {
        type: String,
        required: true
    },
    patient_age: {
        type: Number,
        required: true
    },
    patient_email: {
        type: String,
        required: true
    },
    patient_gender: {
        type: String,
        required: true
    },
    patient_id:{
        type: String,
        required: false
    },
    doc_id: {
        type: String,
        required: false
    },
    result:{
        type: String,
        required:false
    },
    date: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Patient', patientSchema)
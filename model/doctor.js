const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  doc_id: {
    type: String,
    required: true
  },
  hospital_name: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  }
});



module.exports = mongoose.model('Doctor',doctorSchema);

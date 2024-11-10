const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  course: {
    type: [String],
    required: true
  }
});

const employeeModel = mongoose.model("employee", employeeSchema)
module.exports = employeeModel

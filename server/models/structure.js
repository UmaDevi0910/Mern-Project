const mongoose = require('mongoose')


const registerSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    confirmPassword : String
})


const registerModel = mongoose.model("regis", registerSchema)
module.exports = registerModel
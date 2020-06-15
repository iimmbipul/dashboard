const mongoose = require('./../Database/connect').mongoose

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    lastName : {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    email : {
        type: String,
        required: true,
        min: 4,
        max:400
    },
    password : {
        type: String,
        required: true,
        max:500,
        minlength:6
    }
})

module.exports = mongoose.model('User',userSchema)
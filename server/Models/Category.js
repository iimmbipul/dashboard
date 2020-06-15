const mongoose = require('./../Database/connect').mongoose

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        min: 1,
        max: 200
    }
    
})

module.exports = mongoose.model('Category',categorySchema)

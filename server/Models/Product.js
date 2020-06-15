const mongoose = require('./../Database/connect').mongoose

const categorySchema = new mongoose.Schema({
    
    categoryId: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    userId: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    productName : {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    image:{
        type: Array,
        required: true,
    },
    priceWeightMrp:[{
        price:Number,
        weight: String,
        mrp:Number

    }
    ],
    

    
})

module.exports = mongoose.model('Product',categorySchema)

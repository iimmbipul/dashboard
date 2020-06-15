const mongoose = require('mongoose');
const connect = async ()=>{
    await mongoose.connect('mongodb+srv://bipul:iamwithyou@dashboard-p2gwn.mongodb.net/dashboard?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
        if(!err){
            console.log("Connected to Database");
        }
    });
}


module.exports = {
    DB:connect,
    mongoose:mongoose
}

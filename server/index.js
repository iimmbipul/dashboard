const app = require('./app');
const DB_Connect = require('./Database/connect')


DB_Connect.DB().then(()=>{
    app.listen(3000,(err)=>{
        if(!err){
            console.log("server is running");
        }
    })
})

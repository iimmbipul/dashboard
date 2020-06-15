const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./Routes/auth');
const productRoute = require('./Routes/product');
const categoryRoute = require('./Routes/category');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))



//Middlewares
app.use(express.json());

const corsOptions = {
    exposedHeaders: 'authtoken',
  };
  
app.use(cors(corsOptions));

//Routes Midddlewares

app.use('/user',authRoute);
app.use('/',productRoute);
app.use('/',categoryRoute);



module.exports = app;


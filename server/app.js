require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const UserRoute = require('./api/routes/user.routes');
const url = `mongodb+srv://test123:${process.env.DB_PASSWORD}@node-apps-cluster.3skaf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


// 1. Set up MiddleWare

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//2. DB Connection

try {
    const isConnected = mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
    if( isConnected ) {
        console.log('Connected...');
    } 
    else {
         console.log('Connection Failed...')
    }
} catch (error) {
    console.log(error);
}


//3. Routes Defines 

app.use('/user', UserRoute);


//4. When No Routes Defines

app.use((req,res,next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    return res.status(error.status).json({
        msg: error.message,
        statusCode: error.status
    })
})

module.exports = app;
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const routes = require('./api')(router)

const app = express();


const uri = 'mongodb+srv://mongo:77y5De6YBdqR9BtG@cluster0-53eon.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri,function(err){
    if (err) {
    console.log('Authentication to db failed: ', err);
    } else {
        console.log('Connected to DB');
    }
});


app.use('/', routes);
app.listen(4545, function(){
    console.log('Books service is up and running');
})
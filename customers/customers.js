const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const router = express.Router();
const routes = require('./app/api')(router)
const morgan = require('morgan');
const app = express();
var password = process.env.PASSWORD // can be AWS KMS cyper => decrypt it with AWS NodeJS SDK before using it
var user = process.env.USER
var db_host = process.env.DB_URL // @smthing.mongodb.net/smthing?retryWrites=true&w=majority
var uri = 'mongodb://' + user + ':' + password + db_host

mongoose.connect(uri, {useNewUrlParser: true , useUnifiedTopology: true} ,function(err){
    if (err) {
    console.log('Authentication to db failed: ', err);
    } else {
        console.log('Connected to DB');
    }
});
mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);
app.listen(5555, function(err){
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Customers service is up and running');
})
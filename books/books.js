var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var router = express.Router();
var routes = require('./app/api')(router)
var morgan = require('morgan');


var app = express();


var password = process.env.PASSWORD // can be AWS KMS cyper => decrypt it with AWS NodeJS SDK before using it
var user = process.env.USER
var db_host = process.env.DB_URL // @smthing.mongodb.net/smthing?retryWrites=true&w=majority
var uri = 'mongodb+srv://' + user + ':' + password + db_host

mongoose.connect(uri, {useNewUrlParser: true}, function(err){
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
app.listen(4545, function(err){
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Books service is up and running');
})
const Book = require('./model')
const mongoose = require('mongoose');


module.exports = function(router) {

    router.get('/', function(req,res){

    });

    router.get('/books', function(req,res){

    });


    router.get("/book/:id", function(req,res){

    
    });

    router.delete('/book/:id', function(req, res){

    });
    

    return router;
}
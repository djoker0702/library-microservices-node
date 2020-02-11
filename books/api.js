const Book = require('./book-model')
const mongoose = require('mongoose');
const ObjectId = mongoose.mongo.ObjectId;


module.exports = function(router) {

    router.get('/', function(req,res){
        res.send('This is the books service main endpoint')
    })

    router.post('/book', function(req,res){
        var newBook = {
            title: req.body.title,
            author: req.body.author,
            numberPages: req.body.numberPages,
            publisher: req.body.publisher,
        }
        var book = new Book(newBook);
        book.save().then(function(){
            console.log('New brook created');

        }).catch(function(err){
            console.log(err);
            throw err;
        });
        res.send('Book created (or i guess)');

    });

    router.get('/books', function(req,res){
        Book.find().then(function(books){
            console.log(books[0]._id)
            res.json(books);
        }).catch(function(err){
            if (err) {
                res.send(err);
                throw err;
            }
        })
    });


    router.get("/book/:id", function(req,res){

        Book.find().then(function(books){
            if (books) {
                for (i = 0; i <books.length; i++) {
                    if (books[i]._id == req.params.id) {
                        console.log(books[i]);
                        res.status(200).json(books[i]).end();
                    }
                }
                res.status(404).send('Book not found').end();
                
            } else {
                res.status(404).send('Library is empty').end()
            }

        }).catch(function(err){
            if (err) {
                console.log(err);
                res.send(err);
                throw err;
                
            }
        });
    
    });
    



    return router;
}
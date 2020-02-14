const Book = require('./model')
const mongoose = require('mongoose');


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
            res.json(books);
        }).catch(function(err){
            if (err) {
                res.send(err);
                throw err;
            }
        })
    });


    router.get("/book/:id", function(req, res){
        // Check if the id is a proper objectId type
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).end('Invalid Id');
        } else { 
            Book.findById(req.params.id).then(function(book){
                if (book) {
                    res.json(book);
                } else {
                    res.send("Book Not found");
                }
            }).catch(function(err){
                if (err) {
                    console.log(err);
                    res.send(err);
                    throw err;
                }
            });

        }

    });

    router.delete('/book/:id', function(req, res){
        // Check if the id is a proper objectId type
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).end('Invalid Id');
        } else {

            Book.findByIdAndDelete(id).then(function(data){
                if (data) {
                    res.send('Book deleted with success');
                } else {
                    res.send('Book not found');
                }
                
                
            }).catch(function(err){
                if (err) {
                    res.status(500).send('Server failed to process request');
                    console.log(err);
                    throw err;
                }
            });
        }


    });
    



    return router;
}
const Book = require('./book-model')
const ObjectId = require('mongodb').ObjectId

module.exports = function(router) {

    router.get('/', function(req,res){
        res.send('This is the books service main endpoint')
    })

    router.post('/book', function(req,res){
        var newBook = {
            title: req.body.title,
            author: req.body.author,
            numberPages: req.body.numberPages,
            publisher: req.body.publisher
        }
        var book = new Book(newBook);
        book.save().then(function(){
            console.log('new brook created');

        }).catch(function(err){
            console.log(err);
            throw err;
        });
        res.send('Book created (or i guess)');

    });

    router.get('/books', function(req,res){
        Book.find().then(function(books){
            console.log(books);
            res.json(books);
        }).catch(function(err){
            if (err) {
                throw err;
            }
        })
    });


    router.get("/book/:id", function(req,res){
        var id = req.params.id;
        Book.findById(id).then(function(book){
            if (book) {
                res.json(book);
            } else {
                res.sendStatus(404);
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
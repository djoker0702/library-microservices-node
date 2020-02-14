const Order = require('./model')
const mongoose = require('mongoose');
const axios = require('axios');


module.exports = function(router) {
    router.get('/', function(req,res){
        res.send('Orders service main endpoint');
    });

    router.post("/order", function(req, res) {
        var  newOrder = {
            CustomerId: mongoose.Types.ObjectId(req.body.CustomerId),
            BookId: mongoose.Types.ObjectId(req.body.BookId),
            initialDate: req.body.initialDate,
            deliveryDate: req.body.deliveryDate
        }

        var order = new Order(newOrder);
        order.save().then(function(){
            console.log('Order added');
            res.send('Order created');
        }).catch(function(err){
            if (err)
            {
                console.log(err);
                res.status(500).send('Error while processing your request');
                throw err;
            }
        });
    });
    router.get("/orders", function(req, res){
        Order.find().then(function(data){
            if (data) {
                res.json(data);
            } else {
                res.send('No orders found');
            }

        }).catch(function(err){
            if (err) {
                console.log(err);
                res.send('Error while processing the request');
                throw err;
            }
        });

    });
    
    router.get("/order/:id", function(req, res){
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
        {
            res.send('Not a valid Id');

        } else
        {
            Order.findById(id).then(function(order){
                if (order) {

                    axios.get("http://localhost:5555/customer/" + order.CustomerId).then(function(response){

                        var orderObject = {
                            customerName: response.data.name,
                            booktitle: ''
                        }
                        axios.get("http://localhost:4545/book/" + order.BookId).then(function(response){
                             orderObject.booktitle = response.data.title;
                             console.log(orderObject);
                             res.json(orderObject);
                        })
                        
                    })

                } else {
                    res.send('Invalid Order');
                }
            });
        }
        
    });
        
    

    return router;
}
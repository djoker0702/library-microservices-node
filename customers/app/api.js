const Customer = require('./model')
const mongoose = require('mongoose');


module.exports = function(router) {

    router.get('/', function(req,res){

    });

    router.get('/customers', function(req,res){
        Customer.find().then(function(customers){
            res.json(customers);
        }).catch(function(err){
            if (err) {
                res.status(500).send('Error while processing your request');
                throw err;
            }
        })
    });

    router.post('/customer', function(req,res){
        var newCustomer  = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        }
        var customer = new Customer(newCustomer);
        customer.save().then(function(){
            console.log("New customer Created");
            res.send('customer added successfully');

        }).catch(function(err){
            if (err) {
                console.log(err);
                res.status(500).send('Error while processing your request');
                throw err;

            }
        })

    });



    router.get("/customer/:id", function(req,res){
        // Check if the id is a proper objectId type
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).end('Invalid Id');
        } else { 
            Customer.findById(req.params.id).then(function(customer){
                if (customer) {
                    res.json(customer);
                } else {
                    res.send("Customer Not found");
                }
            }).catch(function(err){
                if (err) {
                    console.log(err);
                    res.status(500).send('Error while processing your request');
                    throw err;
                }
            });

        }
    
    });

    router.delete('/customer/:id', function(req, res){

        // Check if the id is a proper objectId type
        id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).end('Invalid Id');
        } else {

            Customer.findByIdAndDelete(id).then(function(data){
                if (data) {
                    res.send('Customer deleted with success');
                } else {
                    res.send('Customer not found');
                }
                
                
            }).catch(function(err){
                if (err) {
                    res.status(500).send('Error while processing your request');
                    console.log(err);
                    throw err;
                }
            });
        }
    });
    

    return router;
}
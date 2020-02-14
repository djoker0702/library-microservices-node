const mongoose = require('mongoose');

const schema = new mongoose.Schema({

       CustomerId: {
           type: mongoose.SchemaTypes.ObjectId,
           require: true
       },
       BookId: {
            type: mongoose.SchemaTypes.ObjectId,
            require: true
       },
       initialDate: {
            type: Date,
            require: true
       },
       deliveryDate: {
           type: Date,
           require: true
       }
});

module.exports = mongoose.model('Order', schema);
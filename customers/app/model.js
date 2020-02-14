const mongoose = require('mongoose');



const schema = new mongoose.Schema({

       name: {
           type: String,
           require: true
       },
       age: {
            type: Number,
            require: true
       },
       address: {
            type: String,
            require: false
       }
});

module.exports = mongoose.model('Customer', schema);
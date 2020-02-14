var mongoose = require('mongoose');
var schema = new mongoose.Schema({

       title: {
           type: String,
           require: true
       },
       author: {
            type: String,
            require: true
       },
       numberPages: {
            type: Number,
            require: false
       },
       publisher: {
           type: String,
           require: false
       }
    
});
module.exports = mongoose.model('Book', schema);
const express = require('express');
const app = express();







app.get('/', function(req,res){
    res.send('This is the books service main endpoint')
})

app.listen(4545, function(){
    console.log('Books service is up and running');
})
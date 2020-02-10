module.exports = function(router) {

    router.get('/', function(req,res){
        res.send('This is the books service main endpoint')
    })

    router.post('/book', function(req,res){
        console.log(req.body)
    });







    return router;
}
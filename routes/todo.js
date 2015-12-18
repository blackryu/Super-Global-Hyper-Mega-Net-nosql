var express = require('express');
var router = express.Router();

//DBA Acesss for todos. 
var todoModel = require('../dbModels/todos');
/* GET Methods*/

router.use(function(req, res, next){
    res.set('Content-Type','application/json');
    next();
});

router.get('/today', function(req, res, next) {
    var date = new Date()
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    console.log("finding todos.....")
    todoModel.find({"duedate" : date.valueOf()},function(err,todos){
        if(err) return next(err);
        console.log(date.valueOf());
        res.json(todos);
    });
    
    //res.send('Get all the todos that are due today');

});

router.get('/:id', function(req, res, next) {
    todoModel.findById(req.params.id, function (err, post){
        if(err) return next(err);
        res.json(post);
    })
    // var todoID = req.params.id;
    // res.send('Get the todo identified by: ' + todoID);

});

/* GET 
*
* todos listng 
* returns all todos
*/
router.get('/', function(req, res, next) {
    /*res.send('Get all the todos for this user'); */
    todoModel.find(function(err, todos){
       if (err) return next(err);
       res.json(todos);
    });
    
});

// POST Methods

router.put('/:id', function(req, res, next) {

    todoModel.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
    // var newTodoId = req.params.id;
    // res.send('Creates or update a todo identified with: ' + newTodoId);
});

router.post('/', function(req, res, next) {

    todoModel.create(req.body, function (err, post){
        if(err) return next(err);
        res.json(post);
    });
    //res.send('create a new TODO');

});

module.exports = router;

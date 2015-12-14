var express = require('express');
var router = express.Router();

//DBA Acesss for todos. 
var todoModel = require('../dbModels/todos');

/* GET Methods*/

router.get('/today', function(req, res, next) {

    res.send('Get all the todos that are due today');

});

router.get('/:id', function(req, res, next) {

    var todoID = req.params.id;
    res.render('todo',{title:'todo detail test',id:todoID});

});

router.get('/', function(req, res, next) {

    /*res.send('Get all the todos for this user');*/
    res.render('todo',{title:'todo test'});

});

// POST Methods

router.put('/:id', function(req, res, next) {

    var newTodoId = req.params.id;

    res.send('Creates or update a todo identified with: ' + newTodoId);

});

router.post('/', function(req, res, next) {

    res.send('create a new TODO');

});

module.exports = router;

var express = require('express');
var router = express.Router();

//DBA Acesss for lists. 
var listModel = require('../dbModels/lists');


    
/* GET Methods*/

router.get('/public', function(req, res, next) { res.send('All the public lists of the user'); });

router.get('/private', function(req, res, next) { res.send('All the private lists of the user'); });

router.get('/:id', function(req, res, next) {

    var listID = req.params.id;
});

router.get('/', function(req, res, next) { 
  
 });

// POST methods

router.put('/:id', function(req, res, next) {

    var listID = req.params.id;

    res.send('updated or created list with id: ' + listID);
});

router.post('/', function(req, res, next) { res.send('Created a new List'); });

module.exports = router;

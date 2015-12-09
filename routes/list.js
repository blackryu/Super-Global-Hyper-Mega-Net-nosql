var express = require('express');
var router = express.Router();

/* GET Methods*/

router.get('/public', function(req, res, next) {
    
    
  res.send('All the public lists of the user');
});


router.get('/private', function(req, res, next) {
    
    
  res.send('All the private lists of the user');
});


router.get('/:id', function(req, res, next) {
    
    var listID = req.params.id;
    
  res.send('list indentified with: ' + listID);
});


router.get('/', function(req, res, next) {
    
    
  res.send('All the list for the user');
});

//POST methods



router.put('/:id', function(req, res, next) {
    
    var listID = req.params.id;
    
  res.send('updated or created list with id: ' + listID);
});


router.post('/', function(req, res, next) {
    
    
  res.send('Created a new List');
});



module.exports = router;

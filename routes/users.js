var express = require('express');
var router = express.Router();

//DBA Acesss for users. 
var userModel = require('../dbModels/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

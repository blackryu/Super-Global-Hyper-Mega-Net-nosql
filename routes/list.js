var express = require('express');
var router = express.Router();

// DBA Acesss for lists.
var listModel = require('../dbModels/lists');

/* GET Methods*/

router.get('/public', function(req, res, next) {

    var user = req.user;
    listModel.find({
                     owner : user,
                     visibility : 'public'

                   }).exec(function(err, results) {

        if(err) {
            throw(err);
        };
        res.send(results);
    });
});

router.get('/private', function(req, res, next) {

    var user = req.user;
    listModel.find({
                     owner : user,
                     visibility : 'private'

                   }).exec(function(err, results) {

        if(err) {
            throw(err);
        };
        res.send(results);
    });

});
// get list from ID
router.get('/:id', function(req, res, next) {

    var listID = req.params.id;

    var user = req.user;
    listModel.findOne({ _name : listID, owner : user }).exec(function(err, results) {

        if(err) {
            throw(err);
        };
        res.send(results);
    });
});

router.get('/', function(req, res, next) {

    var user = req.user;
    listModel.find({
                     owner : user,

                   }).exec(function(err, results) {

        if(err) {
            throw(err);
        };
        res.send(results);
    });

});

// POST methods

//Updates an existing list
router.put('/:id', function(req, res, next) {

    var listID = req.params.id;

});

//Creates a new list
router.post('/', function(req, res, next) {

    var newList = new listModel(req.body.list);

    newList.save(function(err) {

        if(err) {
            throw(err);
            res.sendStatus(500);
            res.send(err);
        } else {
            res.send({ status : 'ok' });
        }

    });
});

module.exports = router;


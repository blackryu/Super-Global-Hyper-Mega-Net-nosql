var express = require('express');
var router = express.Router();

// DBA Acesss for lists.
var listModel = require('../dbModels/lists');


//set respose Type.

//this routes shoudl return only json  
router.use(function(req, res, next){
    
    res.set('Content-Type', 'application/json');
    next();
    });

/* GET Methods*/


router.get('/public', function(req, res, next) {

    //TODO show only for user when auth is added

    var user = req.user._name;
    listModel.find({
                     owner : user,
                     visibility : 'public'

                   }).exec(function(err, results) {

        if(err) {
           return next(err);
        };
       
        res.send(results);
    });
});


router.get('/private', function(req, res, next) {

    //TODO show only for user when auth is added
    var user = req.user._name;
    listModel.find({
                     owner : user,
                     visibility : 'private'

                   }).exec(function(err, results) {
        
        if(err) {
            return next(err);
        };
        
        res.send(results);
    });
});
// get list from ID
router.get('/:id', function(req, res, next) {

    var listID = req.params.id;


    var user = req.user._name;
    listModel.findOne({ _name : listID, owner : user }).exec(function(err, results) {

        if(err) {
            console.error(err);
            return next(err);
        };

        
        res.send(results);
    });
});

router.get('/', function(req, res, next) {

    //TODO show only for user when auth is added
    var user = req.user._name;
    listModel.find({
                     owner : user,

                   }).exec(function(err, results) {

        if(err) {
            console.error(err);
            nex(err);
        };
        res.send(results);
    });

});


// POST methods

// Updates an existing list
router.put('/:id', function(req, res, next) {

    var listID = req.params.id;

});

// Creates a new list
router.post('/', function(req, res, next) {

    var bodyParamNames = Object.keys(req.body);
    var newListDoc = {};
    for(var sentParam in bodyParamNames) {

        if(listModel.schema.paths.hasOwnProperty(bodyParamNames[sentParam])) {

            newListDoc[bodyParamNames[sentParam]] = req.body[bodyParamNames[sentParam]];
        }
    };
    var newList = new listModel(newListDoc);
    newList.save(function(err) {

        if(err) {
            console.error(err.errmsg);
            return next(err);
        } else {
            res.send({ status : 'ok' });
        }

    });
});

module.exports = router;

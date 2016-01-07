var express = require('express');
var router = express.Router();

// DBA Acesss for lists.
var listModel = require('../dbModels/lists');

// set respose Type.

// this routes should return only json
router.use(function(req, res, next) {

    // parse the request params into a object.
    var bodyParamNames = Object.keys(req.body);
    var newListDoc = {};
    for(var sentParam in bodyParamNames) {

        if(listModel.schema.paths.hasOwnProperty(bodyParamNames[sentParam])) {

            newListDoc[bodyParamNames[sentParam]] = req.body[bodyParamNames[sentParam]];
        }
    };
    req.listDoc = newListDoc;
    req.listDoc.owner = req.user._name;
    next();
});

/* GET Methods*/

router.get('/public', function(req, res, next) {

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

router.get('/publicAll', function(req, res, next) {

    var user = req.user._name;
    listModel.find({
                     visibility : 'public'

                   }).exec(function(err, results) {

        if(err) {
            return next(err);
        };

        res.send(results);
    });
});

router.get('/private', function(req, res, next) {

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

    // TODO show only for user when auth is added
    var user = req.user._name;

    

    listModel.find({
                     owner : user,

                   }).exec(function(err, results) {

        if(err) {
            console.error(err);
            nex(err);
        }
        res.send(results);
    });

});

// POST methods

// Updates or creates a list
router.post('/:id', function(req, res, next) {

    var listID = req.params.id;
    listModel.findOneAndUpdate(
        { _name : req.listDoc._name, owner: req.user._name }, req.listDoc, { upsert : false, new : true }, function(err, newList) {

            if(err) {
                console.error(err.errmsg);
                return next(err);
            } else {
                res.send({ status : 'ok' });
            }
        });

});

// Creates a new list
router.post('/', function(req, res, next) {

    var newList = new listModel(req.listDoc);
    newList.save(function(err) {

        if(err) {
            console.error(err.errmsg);
            next(err);
        } else {
            res.send(newList);
        }

    });
});


/* DELETE a single list */
router.delete ('/:id', function(req, res, next) {

    var id = req.params.id;


    listModel.findOne({ _name : id, owner : req.user._name }).remove().exec(function(err, doc) {

        if(err) {

            return next(err);
        }

        res.send({ status : 'ok' });

    });

});




module.exports = router;

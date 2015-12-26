var express = require('express');
var router = express.Router();

// DBA Acesss for lists.
var listModel = require('../dbModels/lists');


//set respose Type.

//this routes should return only json
router.use(function(req, res, next){
    
    res.set('Content-Type', 'application/json');
    //parse the request params into a object. 
    var bodyParamNames = Object.keys(req.body);
    var newListDoc = {};
    for(var sentParam in bodyParamNames) {

        if(listModel.schema.paths.hasOwnProperty(bodyParamNames[sentParam])) {

            newListDoc[bodyParamNames[sentParam]] = req.body[bodyParamNames[sentParam]];
        }
    };
    req.listDoc = newListDoc;
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

router.get('/publicAll', function(req, res, next) {

    //TODO show only for user when auth is added

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
    
    //Check the default Lists of the user.
    var PrivateB="Private Backlog";
    var WorkB="Work Backlog";
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var day=new Date();
    var CurrentDay=day.getDate()+"."+(day.getMonth()+1)+" "+days[ day.getDay() ];
    
    console.info("current Day" +CurrentDay);
    listModel.findOne({
            owner: user,
            _name:PrivateB
    }).exec(function(err,results){
        if(err ||results===null){
            console.info("Creating Default List for user "+user);
             var newList = new listModel({owner:user,_name:PrivateB,color:'pink'});
    newList.save(function(err) {

        if(err) {
            console.error(err.errmsg);
            return next(err);
        }

    });
        }
    });
    
     listModel.findOne({
            owner: user,
            _name:WorkB
    }).exec(function(err,results){
        console.info("results "+results  );
        if(err || results===null){
            console.info("Creating Default List for user "+user);
            var newList = new listModel({owner:user,_name:WorkB,color:'pink'});
            newList.save(function(err) {

            if(err ) {
                console.error(err.errmsg);
               // return next(err);
            }
        });
        }
    });
     listModel.findOne({
            owner: user,
            _name:CurrentDay
    }).exec(function(err,results){
        console.info("results "+results );
        
        if(err || results===null){
            console.info("Creating Todays List for user "+user);
            var newList = new listModel({owner:user,_name:CurrentDay,color:'blue'});
            newList.save(function(err) {
            
                if(err ) {
                    console.error(err.errmsg);
                   // return next(err);
            }
        });
        }
    });


    
    
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
     req.listDoc._name = listID;
    listModel.findOneAndUpdate({_name: req.listDoc._name}, req.listDoc, {upsert: true, new: true}, function(err, newList){
    
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
            return next(err);
        } else {
            res.send({ status : 'ok' });
        }

    });
});

module.exports = router;

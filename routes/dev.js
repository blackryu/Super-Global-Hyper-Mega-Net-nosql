var express = require('express');
var router = express.Router();

function devRoutes(mongoose)
{

    router.get('/destroy', function(req, res, next) {

        console.log('/destroy');
        mongoose.connection.db.listCollections().toArray(function(err, names) {

            if(err){
                console.error(err);
                return res.send(err);
                }          
                
                names.forEach(function(e,i,a) {
                mongoose.connection.db.dropCollection(e.name);
                console.log("dropping--->>", e.name);
                });
            
            res.send({status: "ok"});

        });

    });

    return router;
}

module.exports = devRoutes;

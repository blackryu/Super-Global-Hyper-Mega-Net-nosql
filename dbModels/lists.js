var mongoose = require('mongoose');
var schema = mongoose.Schema;
var listSchema = new schema({
    
    _name: {type: String, required: true},
    owner: {type: String, required: true, index: true},
    visibility: {type: String, default: 'private'},
    color: {type: String, default: '#e95e01'},
    activ: {type: Boolean, default: true},
    todos: []
    });        
    listSchema.index({_name: 1, owner: 1}, {unique: true});
    listSchema.index({owner: 1, visibility: 1});
    listSchema.set('autoIndex', true);
var ListModel = mongoose.model('Lists', listSchema);

    //log index events
    ListModel.on('index', function(err){
        
            if(err){
                
                console.log('error on index creation');
                console.error(err);
                
                }
        });

module.exports = ListModel;

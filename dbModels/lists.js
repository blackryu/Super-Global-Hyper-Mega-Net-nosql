var mongoose = require('mongoose');
var schema = mongoose.Schema;
var listSchema = new schema({
    
    _name: {type: String, required: true},
    owner: {type: String, required: true, unique: false, index: true},
    visibility: {type: String, default: 'private'},
    color: {type: String, default: '#e95e01'},
    activ: {type: Boolean, default: true},
    todos: []
    });        
    listSchema.index({_name: 1, owner: 1});
    listSchema.index({owner: 1, visibility: 1});
var ListModel = mongoose.model('Lists', listSchema);

module.exports = ListModel;

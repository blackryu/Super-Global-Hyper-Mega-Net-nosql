var mongoose = require('mongoose');
var listSchema = mongoose.Schema({
    
    _name: {type: String, unique: true, required: true, index: true},
    owner: {type: String, required: true, index: true},
    visibility: {type: String, required: true, default: 'private'},
    color: {type: String, default: '#e95e01'},
    activ: {type: Boolean, default: true},
    todos: []
    
    }, {_id: false});
        
    listSchema.index({_name: 1, owner: 1});
    listSchema.index({owner: 1, visibility: 1});
var ListModel = mongoose.model('Lists', listSchema);

module.exports = ListModel;

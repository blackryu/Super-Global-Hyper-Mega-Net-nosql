var mongoose = require('mongoose');
var listSchema = mongoose.Schema({
    
    _name: {type: String, unique: true, index: true, required: true},
    owners: {type: Array, required: true},
    visibility: {type: Boolean, required: true},
    color: {type: String, default: '#e95e01'},
    activ: {type: Boolean, default: true},
    todos: []
    
    }, {_id: false});
    
    
var ListModel = mongoose.model('Lists', listSchema);

module.exports = ListModel;

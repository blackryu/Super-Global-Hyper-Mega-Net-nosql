var mongoose = require('mongoose');
//implicit _id
var usersSchema = mongoose.Schema({
    
    _name: {type: String, unique: true, index: true},
    password: String,
    completed: Boolean,
    }, {_id: false});
    
    
var UserModel = mongoose.model('Todos', usersSchema);

module.exports = UserModel;

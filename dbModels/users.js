var mongoose = require('mongoose');
//implicit _id
var usersSchema = mongoose.Schema({
    
    _name: {type: String, unique: true, index: true},
    realName: {type: String},
    password: {type: String, require: true},
    });
    
    
var UserModel = mongoose.model('Users', usersSchema);

module.exports = UserModel;

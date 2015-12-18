var mongoose = require('mongoose');
//implicit _id
var todosSchema = new mongoose.Schema({
    
    duedate: {type: Date},
    description: {type:String, required: true},
    completed: {type:Boolean, default: false},
    });    
    
var TodoModel = mongoose.model('Todos', todosSchema);

module.exports = TodoModel;

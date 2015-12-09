var mongoose = require('mongoose');
//implicit _id
var todosSchema = mongoose.Schema({
    
    duedate: {type: Date},
    description: String,
    completed: Boolean,
    });
    
    
var TodoModel = mongoose.model('Todos', todosSchema);

module.exports = TodoModel;

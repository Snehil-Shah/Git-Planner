const mongoose = require('mongoose');
const Todo = require('./todo');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    todoList: [{
        type: mongoose.ObjectId,
        ref: Todo
    }]
    }, {timestamps: true}
)

module.exports = mongoose.model('Project', projectSchema);


const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    githubIssue: {
        name: String,
        link: String
    },
    completed: {
        type: Boolean,
        default: false
    }
    }, {timestamps: true}
)

module.exports = mongoose.model('Todo', todoSchema);
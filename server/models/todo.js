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
        type: String
    },
    }, {timestamps: true}
)

module.exports = mongoose.model('Todo', todoSchema);
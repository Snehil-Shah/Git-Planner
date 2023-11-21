const mongoose = require('mongoose');
const Todo = require('./todo');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true,
        enum: ['user', 'github']
    },
    repoLink: {
        type: String
    },
    todoList: [{
        type: mongoose.ObjectId,
        ref: Todo
    }]
}, { timestamps: true }
)

projectSchema.pre('findOneAndDelete', async function (next) {
    const project = await this.model.findOne(this.getFilter());
    await Todo.deleteMany({ _id: { $in: project.todoList } });
    next()
})

// TODO: Delete project

module.exports = mongoose.model('Project', projectSchema);


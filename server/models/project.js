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

// FIXME: implement this middleware, is called when deleting user
// TODO: Delete project
// projectSchema.pre('deleteMany', async function (next) {
    // const docsToDelete = await this.model.find(this.getFilter());
    // const todoIdsToDelete = docsToDelete.reduce((ids, doc) => ids.concat(doc.todoList), []);
    // await Todo.deleteMany({ _id: { $in: todoIdsToDelete } });
    // next();
// })

module.exports = mongoose.model('Project', projectSchema);


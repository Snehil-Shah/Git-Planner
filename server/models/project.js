const mongoose = require('mongoose');
const Todo = require('./todo');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // TODO:a github and a normal project should look different, also make sure the add git project isn't visible anymore in create project menu
    provider: {
        type: String,
        required: true,
        enum: ['user', 'github']
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
// projectSchema.pre('deleteMany', async function (next) {
    // const docsToDelete = await this.model.find(this.getFilter());
    // const todoIdsToDelete = docsToDelete.reduce((ids, doc) => ids.concat(doc.todoList), []);
    // await Todo.deleteMany({ _id: { $in: todoIdsToDelete } });
    // next();
// })

module.exports = mongoose.model('Project', projectSchema);


const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports.getTasks = async(req,res) => {
    const {id} = req.query;
    const project = await Project.findById(id).populate('todoList');
    res.send(project.todoList.map((task) => (task['task'])));
}
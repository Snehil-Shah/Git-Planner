const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports.getTasks = async(req,res) => {
    const {id} = req.query;
    console.log(id);
    const project = await Project.findById(id).populate('todoList');
    console.log(project.todoList.map((task) => (task['task'])));
    res.send(project.todoList.map((task) => (task['task'])));
}
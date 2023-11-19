const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports.createTask = async (req, res) => {
    try {
        const { projectId, taskName, taskDescription, linkedIssue } = req.body;
        const newTask = await Todo.create({ task: taskName, description: taskDescription, githubIssue: linkedIssue });
        await Project.findOneAndUpdate({ _id: projectId }, { $push: {todoList: newTask._id} });
        res.status(201).send(newTask);
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteTask = async (req, res) => {
    try{
        const { taskId } = req.params;
        const {projectId} = req.body;
        await Project.findOneAndUpdate({_id: projectId},{$pull : {todoList: taskId}});
        await Todo.findByIdAndDelete(taskId);
        res.status(200).send('Deleted Task');
    } catch(err){
        res.status(500).send('Internal Server Error');
    }
}

module.exports.editTask = async(req,res) => {
    try{
        const {taskId} = req.params;
        const  editDetails  = req.body;
        const oldTask = await Todo.findByIdAndUpdate(taskId, editDetails);
        res.status(200).send(oldTask)
    } catch(err){
        res.status(500).send('Internal Server Error');
    }
}

const Todo = require('../models/todo');
const Project = require('../models/project');

module.exports.createTask = async (req, _res) => {
    try {
        const { projectId, taskName } = req.body;
        const newTask = await Todo.create({ task: taskName });
        await Project.findOneAndUpdate({ _id: projectId }, { $push: {todoList: newTask._id} })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteTask = async (req, _res) => {
    try{
        const { taskId, projectId } = req.body;
        await Project.findOneAndUpdate({_id: projectId},{$pull : {todoList: taskId}});
        await Todo.findByIdAndDelete(taskId);
    } catch(err){
        res.status(500).send('Internal Server Error');
    }
}

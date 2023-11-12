const Project = require('../models/project');

module.exports.getProjects = async (_req, res) => {
    projectsList = await Project.find();
    res.json(projectsList.map((doc)=> ({id: doc['_id'], projectName: doc['name']})))
}

module.exports.getTaskList = async(req,res) => {
    const {projectId} = req.params;
    const project = await Project.findById(projectId).populate('todoList');
    res.send(project.todoList);
}

module.exports.createProject = async(req,res) => {
    try {
        const {projectName} = req.body;
        const newProject = await Project.create({name: projectName});
        res.status(201).send(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.deleteProject = async(req,res) => {
    try{
        const {projectId} = req.params;
        console.log(projectId);
        await Project.findByIdAndDelete(projectId)
    } catch(err){
        res.status(500).send('Internal server error');
    }
}
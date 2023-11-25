const Project = require('../models/project');
const User = require('../models/user')

module.exports.getProjects = async (req, res) => {
    const userDetails = await User.findById(req.user.id).populate('projects');
    projectsList = userDetails.projects;
    res.json(projectsList? projectsList.map((doc)=> ({id: doc['_id'], projectName: doc['name'], provider: doc['provider'], repoLink: doc['repoLink']})): null)
}

module.exports.getTaskList = async(req,res) => {
    const {projectId} = req.params;
    const project = await Project.findById(projectId).populate('todoList');
    res.send(project.todoList);
}

module.exports.createProject = async(req,res) => {
    try {
        const {projectName, provider, repoLink} = req.body;
        const newProject = await Project.create({name: projectName, provider: provider, repoLink: repoLink});
        await User.findByIdAndUpdate(req.user.id,{$push:{projects: newProject._id}});
        res.status(201).send(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.deleteProject = async(req,res) => {
    try{
        const {projectId} = req.params;
        await User.findByIdAndUpdate(req.user.id,{$pull:{projects: projectId}});
        await Project.findByIdAndDelete(projectId)
        res.send('Deleted Project')
    } catch(err){
        res.status(500).send('Internal server error');
    }
}
const Project = require('../models/project');

module.exports.sendList = async (_req, res) => {
    projectsList = await Project.find();
    res.json(projectsList.map((doc)=> ({id: doc['_id'], projectName: doc['name']})))
}
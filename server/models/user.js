const mongoose = require('mongoose');
const Project = require('./project');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    projects:[
        {
            type: mongoose.ObjectId,
            ref: Project
        }
    ]
})

module.exports = mongoose.model('User', userSchema);
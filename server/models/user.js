const mongoose = require('mongoose');
const Project = require('./project');

// TODO: Add model methods and statics

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: String,
    avatarUrl: String,
    projects: [
        {
            type: mongoose.ObjectId,
            ref: Project
        }
    ]
})

module.exports = mongoose.model('User', userSchema);
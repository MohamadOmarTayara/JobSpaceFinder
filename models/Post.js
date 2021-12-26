const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    img:{//Workspace
        type: String
    },
    title:{ //job title
        type: String,
        max: 150
    },
    desc: { //job description
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: [
            {
                userId: String,
                username: String,
                comment: String,
                timestamp: Number,
                profilePicture: String
            }
        ]
    }
}, {timestamps: true});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
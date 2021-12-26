const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');


//create post
router.post('/', async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json(error)
    }
});

//getPost
router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}); 

//getuserposts
router.get('/profile/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        const posts = await Post.find({userId: user._id });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
})

//get;posts
router.get('/timeline/:userId', async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId: friendId})
            })
        )
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        return res.status(500).json(error);
    }
});

//updatePost
router.put('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            return res.status(200).json('Post Updated!')
        } else {
            return res.status(403).json('You can only update your posts')
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

//deletePost
router.delete('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json('Post Deleted!')
        } else {
            return res.status(403).json('You can only delete your posts')
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

//likePost
router.put('/:id/like', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            return res.status(200).json('Post Has Been Liked');
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            return res.status(200).json('Post Has Been Disliked');
        }
    } catch (error) {
        console.log('Error in like');
        return res.status(500).json(error);
    }
});

//addcomment
router.put('/:id/comment', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.updateOne({$push: {
            comments: {
                userId: req.body.userId, 
                username: req.body.username,
                comment: req.body.comment,
                timestamp: new Date().getTime(),
                profilePicture: req.body.profilePicture
            }
        }});
        return res.status(200).json('Comment Added');
    } catch (error) {
        return res.status(500).json(error)
    }
});

//findJob
router.post('/search-posts', async (req, res) => {
    let userPattern = new RegExp(req.body.query)
    Post.find({title:{$regex: userPattern}})
    .then(post=>{
        res.json({post})
    }).catch(err=>{
        console.log(err)
    })
});

module.exports = router;
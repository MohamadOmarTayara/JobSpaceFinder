const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

//get User
router.get('/:id', async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        //we get everything except password, and updatedAT.
        return res.status(200).json(other);
    } catch (error) {
        return next(new ErrorResponse(error, 500)); 
    }
});

//update user
router.put('/:id', async (req, res) => {
    //chech if the user logedin is the use who wantes to update
    if(req.body.userId === req.params.id){
        if(req.body.password){
            try {
                const user = await User.findById(req.body.userId);
                user.password = req.body.password;
                user.save();
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            await User.findByIdAndUpdate(req.body.userId, { $set: req.body });
            return res.status(200).json('User has been updated');
        } catch (error) {
            return res.status(500).json(error);
        }
    }
});

//followeUser
router.put('/:id/follow', async(req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return res.status(200).json('User has been followed')
            } else {
                return res.status(403).json("you allready follow this user");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('You cant follow yourself');
    }
});

//unfollowuser
router.put('/:id/unfollow', async (req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId }});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                return res.status(200).json('user has been unfollowed');
            } else {
                return res.status(403).json('use is not followed');
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('You cant unfollow yourself');
    }
});

//finduser
router.post('/search-users', async (req, res) => {
    let userPattern = new RegExp(`^${req.body.query}`)
    User.find({username:{$regex: userPattern}})
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

router.post('/signup', async (req, res, next) => {

    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        return sendToken(res, 201, user);
    } catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and a password', 400));
    }
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        const isMatched = await user.matchPasswords(password);
        if (!isMatched) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        return sendToken(res, 200, user);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
});

const sendToken = (res, statusCode, user) => {
    const token = user.getSignedToken();
    return res.status(statusCode).json({
        success: true,
        token,
        user: user._id
    })
}

module.exports = router;
require('dotenv').config({path: './dotenv.env'});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const { protect } = require('./middleware/auth');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.get('/getid', protect, (req, res) => {
    return res.status(200).json(req.user._id);
})

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
    console.log('Connected to DB');
}

module.exports = connectDB;
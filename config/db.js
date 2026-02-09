const mongoose = require('mongoose');
const { mongoURI } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('DB connection error:', err.message);
        process.exit(1); // exiting if unable to connect
    }
};

module.exports = connectDB;
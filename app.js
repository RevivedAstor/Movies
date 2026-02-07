const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');

// here are the global middlewares
app.use(express.json()); // parse JSON request bodies ye

// routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

// error handling middleware
app.use(errorHandler);

module.exports = app;
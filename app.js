const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const studentRoutes = require('./api/routes/students');

mongoose.connect(config.db.url);

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes Middleware
app.use('/students', studentRoutes);

// Not Found Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        type: 'error',
        message: err.message
    })
});

module.exports = app;
const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./middleware/cors');

const studentRoutes = require('./routes/students');
const placeRoutes = require('./routes/places');

const notFoundController = require('./controllers/notFound');

mongoose.connect(config.db.url);

app.use(bodyParser.json());

app.use(cors);

app.use('/students', studentRoutes);
app.use('/places', placeRoutes);

app.use('/*', notFoundController);

module.exports = app;
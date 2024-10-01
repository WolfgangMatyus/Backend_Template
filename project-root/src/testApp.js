// src/testApp.js
const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('./routes/members'); // Stelle sicher, dass der Pfad korrekt ist
const app = express();

app.use(bodyParser.json());
app.use('/api/v1/members', membersRoute);

module.exports = app;

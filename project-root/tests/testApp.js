const express = require('express');
const membersRoute = require('../src/routes/members');
const app = express();

app.use(express.json());
app.use('/api/v1/members', membersRoute);

module.exports = app;
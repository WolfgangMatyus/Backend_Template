const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../Backend_Template/project-root/src/routes/membersRoutes');
const authRoutes = require('../Backend_Template/project-root/src/routes/authRoutes');
const userRoutes = require('../Backend_Template/project-root/src/routes/userRoutes'); // Neue Route importieren
const app = express();

app.use(bodyParser.json());

app.use('/api/v1/members', membersRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes); // Neue Route verwenden

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Exportiere die App für Tests
module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../Backend_Template/project-root/src/routes/membersRoutes');
const authRoutes = require('../Backend_Template/project-root/src/routes/authRoutes');
const userRoutes = require('../Backend_Template/project-root/src/routes/userRoutes');
const roleRoutes = require('../Backend_Template/project-root/src/routes/roleRoutes');
const contributionsRoutes = require('../Backend_Template/project-root/src/routes/contributionsRoutes');
const contributionItemsRoutes = require('../Backend_Template/project-root/src/routes/contributionItemsRoutes');

// Dotenv zur Verwendung von Umgebungsvariablen .env importieren
require('dotenv').config();

const app = express();

app.use(express.json());

// Routen hinzufügen
app.use('/api/v1/members', membersRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/contributions', contributionsRoutes);
app.use('/api/v1/contributionItems', contributionItemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Exportiere die App für Tests
module.exports = app;

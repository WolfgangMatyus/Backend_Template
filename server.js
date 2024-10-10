const express = require('express');
const membersRoute = require('./project-root/src/routes/membersRoutes');
const addressesRoutes = require('./project-root/src/routes/addressesRoutes');
const authRoutes = require('./project-root/src/routes/authRoutes');
const userRoutes = require('./project-root/src/routes/userRoutes');
const roleRoutes = require('./project-root/src/routes/roleRoutes');
const contributionsRoutes = require('./project-root/src/routes/contributionsRoutes');
const contributionItemsRoutes = require('./project-root/src/routes/contributionItemsRoutes');

// Dotenv zur Verwendung von Umgebungsvariablen .env importieren
require('dotenv').config();

const app = express();

app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routen hinzufügen
app.use('/api/v1/members', membersRoute);
app.use('/api/v1/addresses', addressesRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/contributions', contributionsRoutes);
app.use('/api/v1/contributionItems', contributionItemsRoutes);

// Fehlerbehandlung Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Etwas ist schief gelaufen!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Exportiere die App für Tests
module.exports = app;

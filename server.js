const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../Backend_Template/project-root/src/routes/members');
const authRoutes = require('../Backend_Template/project-root/src/routes/authRoutes'); // Importiere die Authentifizierungsrouten
const app = express();

app.use(bodyParser.json());

// Registriere die Mitglieder-Routen
app.use('/api/v1/members', membersRoute);

// Registriere die Authentifizierungs-Routen
app.use('/api/v1/auth', authRoutes); // Füge die Authentifizierungs-Route hinzu

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exportiere die App für Tests
module.exports = app;

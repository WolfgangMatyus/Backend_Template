const express = require('express');
const { login } = require('../controllers/authController'); // Importiere die Login-Funktion aus dem Auth-Controller
const router = express.Router();

// Route für die Benutzeranmeldung
router.post('/login', login);

module.exports = router;


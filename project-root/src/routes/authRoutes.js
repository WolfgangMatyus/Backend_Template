const express = require('express');
const { login, getUserByToken } = require('../controllers/authController'); // Importiere die Login-Funktion aus dem Auth-Controller
const { authenticateToken } = require('../middlewares/authMiddleware')
const router = express.Router();

// Route für die Benutzeranmeldung
router.post('/login', login);

router.get('/user', authenticateToken, getUserByToken)

module.exports = router;


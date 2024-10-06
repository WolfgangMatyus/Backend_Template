const express = require('express');
const { login } = require('../security/auth');
const router = express.Router();

// Route für die Benutzeranmeldung
router.post('/login', login);

module.exports = router;

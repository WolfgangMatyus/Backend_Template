// src/routes/passwordRoutes.js
const express = require('express');
const { sendResetLink, resetPassword } = require('../controllers/passwordController');
const { validateEmail } = require('../middlewares/validateEmailMiddleware');
const { validatePasswordReset } = require('../middlewares/validatePasswordResetMiddleware');

const router = express.Router();

// Route zum Senden des Links zum Zurücksetzen des Passworts
router.post('/forgotPassword', validateEmail, sendResetLink);

// Route zum Zurücksetzen des Passworts
router.post('/resetPassword', validatePasswordReset, resetPassword);

module.exports = router;

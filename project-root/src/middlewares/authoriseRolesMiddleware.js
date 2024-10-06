const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../security/permission');

const router = express.Router();

// Route für alle Benutzer
router.get('/dashboard', authMiddleware, authorizeRoles('user', 'trainer', 'organ', 'admin'), (req, res) => {
    res.json({ message: 'Willkommen im Dashboard!' });
});

// Route nur für Admins
router.get('/admin', authMiddleware, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Willkommen, Admin!' });
});

// Route für Trainer und höher
router.get('/trainer', authMiddleware, authorizeRoles('trainer', 'organ', 'admin'), (req, res) => {
    res.json({ message: 'Willkommen, Trainer!' });
});

module.exports = router;

// src/routes/roleRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../security/permission');

const router = express.Router();

// Route für alle Benutzer
router.get('/user', authMiddleware, authorizeRoles('user', 'trainer', 'organ', 'admin'), (req, res) => {
    res.json({ message: 'Willkommen, User!' });
});

// Route für Trainer
router.get('/trainer', authMiddleware, authorizeRoles('trainer', 'organ', 'admin'), (req, res) => {
    res.json({ message: 'Willkommen, Trainer! Sie haben Zugriff auf Ihre Trainingsressourcen.' });
});

// Route für Organe
router.get('/trainer', authMiddleware, authorizeRoles('organ', 'admin'), (req, res) => {
    res.json({ message: 'Willkommen, Funktionär! Sie haben Zugriff auf Ihre Funktionärsressourcen.' });
});

router.post('/calculate-compensation', authMiddleware, authorizeRoles('organ', 'admin'), (req, res) => {
    // Hier wird die Mitgliedsbeitrag berechnet
    res.json({ message: 'Mitgliedsbeitrag wurde erfolgreich berechnet.' });
});

router.post('/calculate-compensation', authMiddleware, authorizeRoles('organ', 'admin'), (req, res) => {
    // Hier wird die Entschädigung berechnet
    res.json({ message: 'Entschädigung wurde erfolgreich berechnet.' });
});

// Route für Admins
router.get('/admin', authMiddleware, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Willkommen, Admin! Sie haben vollen Zugriff auf alle Funktionen.' });
});

router.post('/grant-permissions', authMiddleware, authorizeRoles('organ', 'admin'), (req, res) => {
    // Hier wird die Berechtigung vergeben
    res.json({ message: 'Berechtigung wurde erfolgreich vergeben.' });
});

module.exports = router;

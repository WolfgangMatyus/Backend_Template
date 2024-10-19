const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validateUserInput } = require('../middlewares/validateUserInputMiddleware')
const { authorizeRoles } = require('../security/permission');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

// Benutzer anlegen
router.post('/', validateUserInput, createUser);

// Alle Benutzer abrufen
router.get('/', authenticateToken, authorizeRoles('admin'), getAllUsers);

// Einzelnen Benutzer abrufen (neu hinzugefügt)
router.get('/:id', authenticateToken, authorizeRoles('user'), getUserById);

// Benutzer aktualisieren
router.put('/:id', authenticateToken, authorizeRoles('user'), updateUser);

// Benutzer löschen
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteUser);

module.exports = router;

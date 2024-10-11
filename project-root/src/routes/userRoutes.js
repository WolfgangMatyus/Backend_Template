const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,  // Hinzugefügt
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

const router = express.Router();

// Benutzer anlegen
router.post('/', createUser);

// Alle Benutzer abrufen
router.get('/', getAllUsers);

// Einzelnen Benutzer abrufen (neu hinzugefügt)
router.get('/:id', getUserById);

// Benutzer aktualisieren
router.put('/:id', updateUser);

// Benutzer löschen
router.delete('/:id', deleteUser);

module.exports = router;

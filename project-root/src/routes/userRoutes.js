const express = require('express');
const {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Benutzer anlegen
router.post('/', createUser);

// Alle Benutzer abrufen
router.get('/', getAllUsers);

// Benutzer aktualisieren
router.put('/:id', updateUser);

// Benutzer löschen
router.delete('/:id', deleteUser);

module.exports = router;

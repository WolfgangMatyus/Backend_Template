// addressesRoutes.js
const express = require('express');
const router = express.Router();
const addressesController = require('../controllers/addressesContorller');

// Route zum Abrufen aller Adressen
router.get('/', addressesController.getAllAddresses);

// Route zum Abrufen einer Adresse nach ID
router.get('/:id', addressesController.getAddressById);

// Route zum Erstellen einer neuen Adresse
router.post('/', addressesController.createAddress);

// Route zum Aktualisieren einer Adresse
router.put('/:id', addressesController.updateAddress);

// Route zum Löschen einer Adresse
router.delete('/:id', addressesController.deleteAddress);

module.exports = router;

const express = require('express');
const clothingItemsController = require('../controllers/clothingItemsController.js');
const router = express.Router();

// Beitrag erstellen
router.post('/', clothingItemsController.createClothingItem);

// Alle Beiträge abrufen
router.get('/', clothingItemsController.getAllClothingItems);

// Beitrag nach ID abrufen
router.get('/:id', clothingItemsController.getClothingItemById);

// Beitrag aktualisieren
router.put('/:id', clothingItemsController.updateClothingItem);

// Beitrag löschen
router.delete('/:id', clothingItemsController.deleteClothingItem);

module.exports = router;

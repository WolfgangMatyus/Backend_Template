const express = require('express');
const itemsToContributionController = require('../controllers/itemsToContributionController');
const router = express.Router();

// Beitrag erstellen
router.post('/', itemsToContributionController.createItemsToContribution);

// Alle Beiträge abrufen
router.get('/', itemsToContributionController.getAllItemsToContribution);

// Beitrag nach ID abrufen
router.get('/:id', itemsToContributionController.getItemsToContributionById);

// Beitrag aktualisieren
router.put('/:id', itemsToContributionController.updateItemsToContribution);

// Beitrag löschen
router.delete('/:id', itemsToContributionController.deleteItemsToContribution);

module.exports = router;

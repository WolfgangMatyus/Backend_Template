const express = require('express');
const contributionItemController = require('../controllers/contributionItemsController');
const router = express.Router();

// Beitragsposten erstellen
router.post('/', contributionItemController.createContributionItem);

// Alle Beitragsposten abrufen
router.get('/', contributionItemController.getAllContributionItems);

// Beitragsposten nach ID abrufen
router.get('/:id', contributionItemController.getContributionItemById);

// Beitragsposten aktualisieren
router.put('/:id', contributionItemController.updateContributionItem);

// Beitragsposten löschen
router.delete('/:id', contributionItemController.deleteContributionItem);

module.exports = router;

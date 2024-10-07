const express = require('express');
const contributionItemController = require('../controllers/contributionItemsController');
const router = express.Router();

// Beitragsposten erstellen
router.post('/contribution-items', contributionItemController.createContributionItem);

// Alle Beitragsposten abrufen
router.get('/contribution-items', contributionItemController.getAllContributionItems);

// Beitragsposten nach ID abrufen
router.get('/contribution-items/:id', contributionItemController.getContributionItemById);

// Beitragsposten aktualisieren
router.put('/contribution-items/:id', contributionItemController.updateContributionItem);

// Beitragsposten löschen
router.delete('/contribution-items/:id', contributionItemController.deleteContributionItem);

module.exports = router;

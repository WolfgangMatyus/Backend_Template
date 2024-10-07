const express = require('express');
const contributionsController = require('../controllers/contributionsController');
const router = express.Router();

// Beitrag erstellen
router.post('/', contributionsController.createContribution);

// Alle Beiträge abrufen
router.get('/', contributionsController.getAllContributions);

// Beitrag nach ID abrufen
router.get('/:id', contributionsController.getContributionById);

// Beitrag aktualisieren
router.put('/:id', contributionsController.updateContribution);

// Beitrag löschen
router.delete('/:id', contributionsController.deleteContribution);

module.exports = router;

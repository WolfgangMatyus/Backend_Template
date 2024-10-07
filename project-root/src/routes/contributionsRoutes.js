const express = require('express');
const contributionController = require('../controllers/contributionsController');
const router = express.Router();

// Beitrag erstellen
router.post('/contributions', contributionController.createContribution);

// Alle Beiträge abrufen
router.get('/contributions', contributionController.getAllContributions);

// Beitrag nach ID abrufen
router.get('/contributions/:id', contributionController.getContributionById);

// Beitrag aktualisieren
router.put('/contributions/:id', contributionController.updateContribution);

// Beitrag löschen
router.delete('/contributions/:id', contributionController.deleteContribution);

module.exports = router;

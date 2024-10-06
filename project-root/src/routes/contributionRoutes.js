const express = require('express');
const { generateContributions, sendContribution } = require('../controllers/contributionsController');
const router = express.Router();

// POST /api/v1/contributions/generate - Beitragsvorschreibung generieren
router.post('/generate', generateContributions);

// POST /api/v1/contributions/send/:id - Beitragsvorschreibung an Mitglied senden
router.post('/send/:id', sendContribution);

module.exports = router;

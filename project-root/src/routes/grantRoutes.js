const express = require('express');
const { applyForGrant } = require('../controllers/grantsController');
const router = express.Router();

// POST /api/v1/grants - Förderungsansuchen erstellen
router.post('/', applyForGrant);

module.exports = router;

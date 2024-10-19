const express = require('express');
const {
  createJudoSpecifics,
  getJudoSpecificsByMemberId,
  updateJudoSpecifics,
  deleteJudoSpecifics
} = require('../controllers/judoSpecificsController');

const router = express.Router();

// POST /api/v1/judo-specifics - Judo-spezifische Daten erstellen
router.post('/', createJudoSpecifics);

// GET /api/v1/judo-specifics/:member_id - Judo-spezifische Daten eines Mitglieds abrufen
router.get('/:member_id', getJudoSpecificsByMemberId);

// PUT /api/v1/judo-specifics/:member_id - Judo-spezifische Daten eines Mitglieds aktualisieren
router.put('/:member_id', updateJudoSpecifics);

// DELETE /api/v1/judo-specifics/:member_id - Judo-spezifische Daten eines Mitglieds löschen
router.delete('/:member_id', deleteJudoSpecifics);

module.exports = router;

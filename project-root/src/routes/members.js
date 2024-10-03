const express = require('express');
const { 
  registerMember, 
  getAllMembers, 
  getMemberById, 
  updateMember 
} = require('../controllers/membersController');
const { validateMemberInput } = require('../middlewares/validationMiddleware');
const router = express.Router();

// POST /api/v1/members - Mitglieder Registrierung
router.post('/', validateMemberInput, registerMember);

// GET /api/v1/members - Alle Mitglieder abrufen
router.get('/', getAllMembers);

// GET /api/v1/members/:id - Einzelnes Mitglied abrufen
router.get('/:id', getMemberById);

// PUT /api/v1/members/:id - Mitgliederprofil aktualisieren
router.put('/:id', updateMember);

// DELETE /api/v1/members/:id - Mitglied löschen
router.delete('/:id', deleteMember);

module.exports = router;

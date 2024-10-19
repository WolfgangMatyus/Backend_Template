// membersRoutes.js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profile_pictures' });
const {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/membersController');
const { validateMemberInput } = require('../middlewares/validateMemberInputMiddleware');

const router = express.Router();

// POST /api/v1/members - Mitglieder Registrierung
router.post('/', validateMemberInput, registerMember);

// GET /api/v1/members - Alle Mitglieder abrufen
router.get('/', getAllMembers);

// GET /api/v1/members/:id - Einzelnes Mitglied abrufen
router.get('/:id', getMemberById);

// PUT /api/v1/members/:id - Mitgliederprofil aktualisieren
router.put('/:id', validateMemberInput, updateMember);

// DELETE /api/v1/members/:id - Mitglied löschen
router.delete('/:id', deleteMember);

module.exports = router;

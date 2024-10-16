// membersRoutes.js
const express = require('express');
const { registerMemberController } = require('../controllers/membersController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profile_pictures' });
const {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/membersController'); // Achte darauf, den richtigen Dateinamen zu verwenden
const { validateMemberInput } = require('../middlewares/validateMemberInputMiddleware'); // Hier auch sicherstellen

const router = express.Router();

// POST /api/v1/members - Mitglieder Registrierung
router.post('/', validateMemberInput, registerMember);

// Route für das Hochladen eines Profilbildes
router.post('/members/:id/upload-profile-picture', upload.single('profilePicture'), memberController.uploadProfilePicture);

// GET /api/v1/members - Alle Mitglieder abrufen
router.get('/', getAllMembers);

// GET /api/v1/members/:id - Einzelnes Mitglied abrufen
router.get('/:id', getMemberById);

// PUT /api/v1/members/:id - Mitgliederprofil aktualisieren
router.put('/:id', validateMemberInput, updateMember);

// DELETE /api/v1/members/:id - Mitglied löschen
router.delete('/:id', deleteMember);

module.exports = router;

const express = require('express');
const { registerMember, getAllMembers } = require('../controllers/membersController'); // Importiere die Route
const { validateMemberInput } = require('../middlewares/validationMiddleware'); // Stelle sicher, dass dies korrekt ist
const router = express.Router();

// POST /members
router.post('/', validateMemberInput, registerMember); 

// GET /members/getAllMembers
router.get('/getAllMembers', getAllMembers); 

module.exports = router;

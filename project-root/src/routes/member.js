const express = require('express');
const { registerMember } = require('../controllers/membersController');
const { validateMemberInput } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.post('/', registerMember); // POST /members

module.exports = router;

// validationMiddleware.js
const validateMemberInput = (req, res, next) => {
  const { firstName, lastName, dateOfBirth } = req.body;
  if (!firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ message: 'Bitte füllen Sie alle Pflichtfelder aus.' });
  }
  next();
};

module.exports = { validateMemberInput };

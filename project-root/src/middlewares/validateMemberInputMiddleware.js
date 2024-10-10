const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Einfaches Regex zur Überprüfung von E-Mail-Adressen
  return emailRegex.test(email);
};

const validateMemberInput = (req, res, next) => {
  const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      memberSince,
      guardianName,
      guardianContact,
      address,
      email,
      phone,
      nationality
  } = req.body;

  const missingFields = []; // Array für fehlende Felder

  // Überprüfe, ob die erforderlichen Felder ausgefüllt sind und füge fehlende Felder zum Array hinzu
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!dateOfBirth) missingFields.push('dateOfBirth');
  if (!gender) missingFields.push('gender');
  if (!memberSince) missingFields.push('memberSince');
  if (!guardianName) missingFields.push('guardianName');
  if (!guardianContact) missingFields.push('guardianContact');
  if (!address) missingFields.push('address');
  if (!email) missingFields.push('email');
  if (!phone) missingFields.push('phone');
  if (!nationality) missingFields.push('nationality');

  // Wenn es fehlende Felder gibt, gib eine detaillierte Fehlermeldung zurück
  if (missingFields.length > 0) {
      return res.status(400).json({
          message: 'Bitte füllen Sie die folgenden Pflichtfelder aus: ' + missingFields.join(', ')
      });
  }

  // Hier könnten weitere spezifische Validierungen erfolgen (z.B. Email)
  if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' });
  }

  next(); // Weiter zur nächsten Middleware oder Route
};

module.exports = { validateMemberInput };

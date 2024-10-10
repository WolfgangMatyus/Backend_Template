const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Einfaches Regex zur Überprüfung von E-Mail-Adressen
  return emailRegex.test(email);
};

const validateMemberInput = (req, res, next) => {
  const {
    first_name,
    last_name,
    date_of_birth,
      gender,
      member_since,
      guardian_name,
      guardian_contact,
      email,
      phone,
      nationality
  } = req.body;

  const missingFields = []; // Array für fehlende Felder

  // Überprüfe, ob die erforderlichen Felder ausgefüllt sind und füge fehlende Felder zum Array hinzu
  if (!first_name) missingFields.push('first_name');
  if (!last_name) missingFields.push('last_name');
  if (!date_of_birth) missingFields.push('date_of_birth');
  if (!gender) missingFields.push('gender');
  if (!member_since) missingFields.push('member_since');
  if (!guardian_name) missingFields.push('guardian_name');
  if (!guardian_contact) missingFields.push('guardian_contact');
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

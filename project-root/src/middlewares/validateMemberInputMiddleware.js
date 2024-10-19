const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phone);
};

const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString) && !isNaN(new Date(dateString).getTime());
};

const validateMemberInput = (req, res, next) => {
  const {
      first_name,
      last_name,
      date_of_birth,
      member_since,
      guardian_name,
      guardian_contact,
      email,
      phone,
  } = req.body;

  const missingFields = [];
  const errors = [];

  // Überprüfe auf fehlende Pflichtfelder
  if (!first_name) missingFields.push('first_name');
  if (!last_name) missingFields.push('last_name');
  if (!date_of_birth) missingFields.push('date_of_birth');
  if (!member_since) missingFields.push('member_since');
  if (!guardian_name) missingFields.push('guardian_name');
  if (!guardian_contact) missingFields.push('guardian_contact');
  if (!email) missingFields.push('email');
  if (!phone) missingFields.push('phone');

  // Füge Fehler für fehlende Felder hinzu
  if (missingFields.length > 0) {
      errors.push('Fehlende Pflichtfelder: ' + missingFields.join(', '));
  }

  // Füge spezifische Validierungen hinzu
  if (!isValidEmail(email)) {
      errors.push('Ungültige E-Mail-Adresse.');
  }
  if (!isValidPhoneNumber(phone)) {
      errors.push('Ungültige Telefonnummer.');
  }
  if (!isValidDate(date_of_birth)) {
      errors.push('Ungültiges Geburtsdatum.');
  }
  if (!isValidDate(member_since)) {
      errors.push('Ungültiges Mitgliedsdatum.');
  }

  // Rückgabe der Fehler, falls vorhanden
  if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(' ') });
  }

  next();
};

module.exports = { validateMemberInput };

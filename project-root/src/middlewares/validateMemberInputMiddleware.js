// validationMiddleware.js
const validateMemberInput = (req, res, next) => {
  const { firstName, lastName, dateOfBirth, address, email, phone, postal_code, city } = req.body;
  const missingFields = []; // Array für fehlende Felder

  // Überprüfe, ob die erforderlichen Felder ausgefüllt sind und füge fehlende Felder zum Array hinzu
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!dateOfBirth) missingFields.push('dateOfBirth');
  if (!address) missingFields.push('address');
  if (!email) missingFields.push('email');
  if (!phone) missingFields.push('phone');
  if (!postal_code) missingFields.push('postal_code');
  if (!city) missingFields.push('city');

  // Wenn es fehlende Felder gibt, gib eine detaillierte Fehlermeldung zurück
  if (missingFields.length > 0) {
    return res.status(400).json({ 
      message: 'Bitte füllen Sie die folgenden Pflichtfelder aus: ' + missingFields.join(', ') 
    });
  }

  next(); // Weiter zur nächsten Middleware oder Route
};

module.exports = { validateMemberInput };
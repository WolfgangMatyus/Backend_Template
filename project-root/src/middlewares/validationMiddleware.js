const validateMemberInput = (req, res, next) => {
    const { firstName, lastName, dateOfBirth, address, email, phone } = req.body;
  
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Bitte füllen Sie alle Pflichtfelder aus.' });
    }
  
    // Weitere Validierungslogik (z.B. Format des Datums)
    next();
  };
  
// validateUserInput.js
const validateUserInput = (req, res, next) => {
    const { email, password, memberId } = req.body;
    const missingFields = []; // Array für fehlende Felder

    // Überprüfe, ob die erforderlichen Felder ausgefüllt sind und füge fehlende Felder zum Array hinzu
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (memberId && !isValidUUID(memberId)) missingFields.push('memberId'); // Überprüfe memberId auf UUID-Format

    // Wenn es fehlende Felder gibt, gib eine detaillierte Fehlermeldung zurück
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: 'Bitte füllen Sie die folgenden Pflichtfelder aus: ' + missingFields.join(', ') 
        });
    }

    next(); // Weiter zur nächsten Middleware oder Route
};

// Funktion zur Überprüfung, ob eine ID eine gültige UUID ist
const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

module.exports = { validateUserInput };

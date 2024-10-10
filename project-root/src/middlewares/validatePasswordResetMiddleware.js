// validatePasswordReset.js
const validatePasswordReset = (req, res, next) => {
    const { token, newPassword } = req.body;
    const missingFields = [];

    // Überprüfe, ob die erforderlichen Felder ausgefüllt sind
    if (!token) missingFields.push('token');
    if (!newPassword) missingFields.push('newPassword');

    // Wenn es fehlende Felder gibt, gib eine detaillierte Fehlermeldung zurück
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: 'Bitte füllen Sie die folgenden Pflichtfelder aus: ' + missingFields.join(', ')
        });
    }

    next(); // Weiter zur nächsten Middleware oder Route
};

module.exports = { validatePasswordReset };

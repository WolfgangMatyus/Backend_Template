// validateEmail.js
const validateEmail = (req, res, next) => {
    const { email } = req.body;

    // Überprüfe, ob die E-Mail-Adresse angegeben ist
    if (!email) {
        return res.status(400).json({ message: 'Email ist erforderlich.' });
    }

    // Hier kannst du auch weitere Validierungen hinzufügen (z.B. E-Mail-Format)

    next(); // Weiter zur nächsten Middleware oder Route
};

module.exports = { validateEmail };

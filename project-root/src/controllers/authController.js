const bcrypt = require('bcryptjs');
const { generateToken } = require('../security/jwt'); // Importiere die Token-Generierungsfunktion
const User = require('../models/user'); // Importiere dein User-Modell hier

// Login Funktion
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Finde den Benutzer mit der E-Mail-Adresse
        const user = await User.findOne({ where: { email } });

        // Überprüfe, ob der Benutzer existiert
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Überprüfe das Passwort
        const isMatch = await bcrypt.compare(password, user.password_hash); // Passwort prüfen

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generiere JWT Token
        const token = generateToken(user); // Verwende die Funktion aus jwt.js

        res.json({ token }); // Sende den Token als Antwort
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };

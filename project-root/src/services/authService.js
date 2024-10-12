// services/authService.js
const bcrypt = require('bcryptjs');
const { generateToken } = require('../security/jwt');
const User = require('../models/user');
const Role = require('../models/role');

// Login Funktion
const loginService = async (email, password) => {
    // Finde den Benutzer mit der E-Mail-Adresse
    const user = await User.findOne({ 
        where: { email },
        include: [{ model: Role, as: 'role' }], 
    });

    // Überprüfe, ob der Benutzer existiert
    if (!user) {
        throw new Error('User not found');
    }

    // Überprüfe das Passwort
    const isMatch = await bcrypt.compare(password, user.password_hash); // Passwort prüfen

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generiere JWT Token
    const token = generateToken(user);

    // Entferne das password_hash-Feld aus dem User-Objekt
    const { password_hash, ...userWithoutPasswordHash } = user.dataValues;

    return { token, user: userWithoutPasswordHash };
};

module.exports = { loginService };

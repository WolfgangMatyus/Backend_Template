// controllers/authController.js
const { loginService } = require('../services/authService');
const User = require('../models/user');
const Role = require('../models/role');

// Login Funktion
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await loginService(email, password);
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        } else if (error.message === 'Invalid credentials') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserByToken = async (req, res) => {
    try {
        const userId = req.user.id; // Benutzer-ID aus dem Token extrahieren

        // Benutzerinformationen abrufen
        const user = await User.findOne({
            where: { id: userId },
            include: { model: Role, as: 'role' } // Optional: Rolle des Benutzers mit einbeziehen
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Entferne das password_hash-Feld aus den Benutzerinformationen
        const { password_hash, ...userWithoutPasswordHash } = user.dataValues;

        res.json(userWithoutPasswordHash); // Benutzerinformationen zurückgeben
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login, getUserByToken  };

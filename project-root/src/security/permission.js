// src/security/permission.js
const db = require('../config/database'); // Importiere deine DB-Logik

// Middleware für die Autorisierung basierend auf Rollen
const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        const userRole = req.user.role; // Angenommen, du hast die Rolle im req.user gespeichert

        // Überprüfe, ob der Benutzer eine der erforderlichen Rollen hat
        if (roles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({ message: 'Zugriff verweigert.' });
    };
};

module.exports = { authorizeRoles };

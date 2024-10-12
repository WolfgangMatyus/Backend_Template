// src/security/permission.js
const User = require('../models/user');
const Role = require('../models/role');

const roleHierarchy = {
    admin: ['admin', 'official', 'trainer', 'user'],
    official: ['official', 'trainer', 'user'],
    trainer: ['trainer', 'user'],
    user: ['user']
};

// Middleware für die Autorisierung basierend auf Rollen
const authorizeRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id; // ID des Benutzers aus dem JWT

            // Benutzer mit seiner Rolle abrufen
            const user = await User.findOne({
                where: { id: userId },
                include: { model: Role, as: 'role' }  // Rolle des Benutzers abrufen
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userRole = user.role.role_name;  // Die Rolle des Benutzers

            // Alle erlaubten Rollen der Hierarchie abrufen
            const userAllowedRoles = roleHierarchy[userRole] || [];

            // Bestimme alle übergeordneten Rollen, basierend auf der übergebenen Rolle
            let expandedAllowedRoles = new Set();
            allowedRoles.forEach(role => {
                const rolesFromHierarchy = roleHierarchy[role] || [];
                rolesFromHierarchy.forEach(hierRole => expandedAllowedRoles.add(hierRole));
            });

            // Überprüfen, ob der Benutzer Zugriff hat (eine der erlaubten Rollen passt zur Hierarchie)
            const isAuthorized = allowedRoles.includes(userRole);

            if (!isAuthorized) {
                return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
            }

            next(); // Benutzer hat Zugriff
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };
};


module.exports = { authorizeRoles };

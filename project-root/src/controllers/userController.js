// userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Importiere das User-Modell
const Role = require('../models/role'); // Importiere das Role-Modell
const UserRole = require('../models/userRole');

// Benutzer anlegen (Create) und Rolle zuweisen
const createUser = async (req, res) => {
    const { username, email, password, memberId } = req.body; // memberId aus dem Body extrahieren

    try {
        // Überprüfen, ob der Benutzer bereits existiert
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User existiert bereits' });
        }

        // Hash das Passwort
        const password_hash = await bcrypt.hash(password, 10);

        // Erstelle den Benutzer
        const user = await User.create({ 
            username, 
            email, 
            password_hash,
            member_id: memberId // memberId hier setzen
        });

        // Rolle finden (z.B. 'user' als Standardrolle)
        const role = await Role.findOne({ where: { role_name: 'user' } });
        if (!role) {
            return res.status(400).json({ message: 'Rolle nicht gefunden' });
        }

        // Verknüpfe den Benutzer mit der Rolle
        await UserRole.create({ user_id: user.id, role_id: role.id });

        res.status(201).json({ 
            id: user.id, 
            email: user.email,
            memberId: user.member_id, // memberId im Response hinzufügen
            role: role.role_name // Rolle im Response anzeigen
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Alle Benutzer abrufen (Read)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Benutzer aktualisieren (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { memberId, email, password, role } = req.body; // memberId und role aus dem Body extrahieren

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash das Passwort, wenn es bereitgestellt wurde
        if (password) {
            user.password_hash = await bcrypt.hash(password, 10);
        }

        // Überprüfen, ob die memberId gültig ist, wenn sie bereitgestellt wird
        if (memberId) {
            const memberExists = await Member.findByPk(memberId);
            if (!memberExists) {
                return res.status(400).json({ message: 'Mitglied nicht gefunden.' });
            }
            user.member_id = memberId; // memberId aktualisieren, wenn bereitgestellt
        }

        // Aktualisiere die Benutzerinformationen
        user.email = email || user.email;

        // Rolle aktualisieren, wenn angegeben
        if (role) {
            const roleRecord = await Role.findOne({ where: { role_name: role } });
            if (roleRecord) {
                await user.setRoles([roleRecord]); // Setze die neue Rolle
            }
        }

        await user.save();

        res.json({ message: 'User updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Benutzer löschen (Delete)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
};

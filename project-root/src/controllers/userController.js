const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importiere das User-Modell

// Benutzer anlegen (Create)
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash das Passwort
        const password_hash = await bcrypt.hash(password, 10);

        // Erstelle den Benutzer
        const user = await User.create({ name, email, password_hash });

        res.status(201).json({ id: user.id, name: user.name, email: user.email });
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
    const { name, email, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash das Passwort, wenn es bereitgestellt wurde
        if (password) {
            user.password_hash = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;

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

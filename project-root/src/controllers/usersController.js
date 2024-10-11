// userController.js
const {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
} = require('../services/usersService');

// Benutzer erstellen (Create)
const createUser = async (req, res) => {
    const { username, email, password, memberId, role_name } = req.body;

    try {
        const newUser = await createUserService({ username, email, password, memberId, role_name });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Alle Benutzer abrufen (Read)
const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Benutzer anhand der ID abrufen (Read by ID)
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Benutzer aktualisieren (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { memberId, email, password, role } = req.body;

    try {
        const updatedUser = await updateUserService(id, { memberId, email, password, role });
        res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Benutzer löschen (Delete)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteUserService(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};

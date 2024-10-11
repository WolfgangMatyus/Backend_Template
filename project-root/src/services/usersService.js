const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Member = require('../models/members'); // Benötigt für Member-Validierung

// Erstelle einen neuen Benutzer
const createUserService = async ({ username, email, password, memberId, role_name }) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User existiert bereits');
    }

    const password_hash = await bcrypt.hash(password, 10);

    // Finde die Rolle anhand des Namens
    const role = await Role.findOne({ where: { role_name } });
    if (!role) {
        throw new Error('Rolle nicht gefunden');
    }

    // Erstelle den Benutzer mit der Rolle
    const user = await User.create({
        username,
        email,
        password_hash,
        member_id: memberId,
        role_id: role.id,
    });

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        memberId: user.member_id,
        role: role.role_name,
    };
};

// Alle Benutzer abrufen
const getAllUsersService = async () => {
    return await User.findAll();
};

// Benutzer nach ID abrufen
const getUserByIdService = async (id) => {
    const user = await User.findByPk(id, {
        include: { model: Role, as: 'role' }, // Rolle des Benutzers einbinden
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// Benutzer aktualisieren
const updateUserService = async (id, { memberId, email, password, role }) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    // Hash das Passwort, wenn es bereitgestellt wurde
    if (password) {
        user.password_hash = await bcrypt.hash(password, 10);
    }

    // Überprüfen, ob die memberId gültig ist
    if (memberId) {
        const memberExists = await Member.findByPk(memberId);
        if (!memberExists) {
            throw new Error('Mitglied nicht gefunden.');
        }
        user.member_id = memberId;
    }

    // Benutzerinformationen aktualisieren
    user.email = email || user.email;

    // Rolle aktualisieren, wenn angegeben
    if (role) {
        const roleRecord = await Role.findOne({ where: { role_name: role } });
        if (roleRecord) {
            user.role_id = roleRecord.id; // Setze die neue Rolle
        }
    }

    await user.save();
    return user;
};

// Benutzer löschen
const deleteUserService = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    await user.destroy();
    return { message: 'User deleted' };
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
};

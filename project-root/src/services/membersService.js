// membersService.js
const sequelize = require('../config/database');

// Mitglied registrieren
const registerMember = async (memberData) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        memberSince,
        guardianName,
        guardianContact,
        addressId,
        email,
        phone,
        nationality
    } = memberData;

    try {
        const result = await sequelize.query(
            'INSERT INTO members (first_name, last_name, date_of_birth, gender, member_since, guardian_name, guardian_contact, address_id, email, phone, nationality) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [firstName, lastName, dateOfBirth, gender, memberSince, guardianName, guardianContact, addressId, email, phone, nationality]
        );
        return result.rows[0]; // Gibt das neu registrierte Mitglied zurück
    } catch (error) {
        console.error('Fehler beim Registrieren des Mitglieds:', error);
        throw new Error('Fehler bei der Registrierung des Mitglieds');
    }
};

// Alle Mitglieder abrufen
const getAllMembers = async () => {
    try {
        const result = await sequelize.query('SELECT * FROM members');
        return result.rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Mitglieder:', error);
        throw new Error('Fehler beim Abrufen der Mitglieder');
    }
};

// Einzelnes Mitglied anhand der ID abrufen
const getMemberById = async (id) => {
    try {
        const result = await sequelize.query('SELECT * FROM members WHERE id = $1', [id]);
        return result.rows[0] || null; // Gibt null zurück, wenn kein Mitglied gefunden wurde
    } catch (error) {
        console.error('Fehler beim Abrufen des Mitglieds:', error);
        throw new Error('Fehler beim Abrufen des Mitglieds');
    }
};

const updateMember = async (id, memberData) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        memberSince,
        guardianName,
        guardianContact,
        addressId,
        email,
        phone,
        nationality
    } = memberData;

    try {
        const result = await sequelize.query(
            'UPDATE members SET first_name = $1, last_name = $2, date_of_birth = $3, gender = $4, member_since = $5, guardian_name = $6, guardian_contact = $7, address_id = $8, email = $9, phone = $10, nationality = $11 WHERE id = $12 RETURNING *',
            [firstName, lastName, dateOfBirth, gender, memberSince, guardianName, guardianContact, addressId, email, phone, nationality, id]
        );
        return result.rows[0] || null; // Gibt null zurück, wenn kein Mitglied gefunden wurde
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Mitglieds:', error);
        throw new Error('Fehler beim Aktualisieren des Mitglieds');
    }
};

// Mitglied löschen
const deleteMember = async (id) => {
    try {
        const result = await sequelize.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0 ? result.rows[0] : null; // Gibt null zurück, wenn kein Mitglied gefunden wurde
    } catch (error) {
        console.error('Fehler beim Löschen des Mitglieds:', error);
        throw new Error('Fehler beim Löschen des Mitglieds');
    }
};

module.exports = {
    registerMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};

const pool = require('../config/db_pg');

const registerMember = async (req, res) => {
    const { firstName, lastName, dateOfBirth, address, email, phone } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO members (first_name, last_name, date_of_birth, address, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, dateOfBirth, address, email, phone]
        );

        const newMember = result.rows[0];
        res.status(201).json({
            message: 'Mitglied erfolgreich registriert',
            member: newMember,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler bei der Registrierung' });
    }
};

// Füge die GET-Funktion hinzu
const getAllMembers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM members');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Mitglieder' });
    }
};

module.exports = { registerMember, getAllMembers }; // Stelle sicher, dass beide Funktionen hier exportiert werden

const pool = require('../config/db');

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

module.exports = { registerMember };

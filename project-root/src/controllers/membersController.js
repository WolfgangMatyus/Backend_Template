const pool = require('../config/db_pg');

// Registrierung eines neuen Mitglieds
const registerMember = async (req, res) => {
  const { firstName, lastName, dateOfBirth, address, email, phone } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO members (first_name, last_name, date_of_birth, address, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, dateOfBirth, address, email, phone]
    );

    res.status(201).json({
      message: 'Mitglied erfolgreich registriert',
      member: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler bei der Registrierung' });
  }
};

// Abrufen aller Mitglieder
const getAllMembers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Mitglieder' });
  }
};

// Abrufen eines einzelnen Mitglieds anhand der ID
const getMemberById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mitglied nicht gefunden' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Abrufen des Mitglieds' });
  }
};

// Aktualisieren eines Mitgliedsprofils
const updateMember = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, address, email, phone } = req.body;

  try {
    const result = await pool.query(
      'UPDATE members SET first_name = $1, last_name = $2, address = $3, email = $4, phone = $5 WHERE id = $6 RETURNING *',
      [firstName, lastName, address, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mitglied nicht gefunden' });
    }

    res.status(200).json({
      message: 'Mitglied erfolgreich aktualisiert',
      member: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Mitglieds' });
  }
};

module.exports = {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember
};

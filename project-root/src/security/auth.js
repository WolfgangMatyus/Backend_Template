const { generateToken } = require('./jwt');
const bcrypt = require('bcrypt');
const db = require('../db'); // Passe den Pfad zu deiner DB-Logik an

// Funktion für die Benutzeranmeldung
async function login(req, res) {
    const { email, password } = req.body;

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
        return res.status(400).json({ error: 'Ungültige Anmeldedaten.' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
        return res.status(400).json({ error: 'Ungültige Anmeldedaten.' });
    }

    const token = generateToken(user.rows[0]);
    res.status(200).json({ token });
}

module.exports = { login };

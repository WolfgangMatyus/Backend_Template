const jwt = require('jsonwebtoken');

// Funktion zur Generierung eines JWT
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET, // Stelle sicher, dass dies in deinen Umgebungsvariablen definiert ist
        { expiresIn: '15m' } // Token läuft nach 15 Minuten ab
    );
}

// Funktion zur Verifizierung eines JWT
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };

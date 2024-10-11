// jwt.js
const jwt = require('jsonwebtoken');

// Funktion zur Generierung eines JWT
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
    );
}

// Funktion zur Verifizierung eines JWT
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorised :: No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorised :: Invalid token' });

        req.user = user; // Füge Benutzerdaten zum Request-Objekt hinzu
        next();
    });
};

module.exports = { authenticateToken };


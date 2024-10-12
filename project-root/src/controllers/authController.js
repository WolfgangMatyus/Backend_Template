// controllers/authController.js
const { loginService } = require('../services/authService');

// Login Funktion
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await loginService(email, password);
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        } else if (error.message === 'Invalid credentials') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };

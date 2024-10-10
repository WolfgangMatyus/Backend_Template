const PasswordService = require('../services/passwordService');

// Sendet einen Link zum Zurücksetzen des Passworts
const sendResetLink = async (req, res) => {
    const { email } = req.body;

    try {
        const message = await PasswordService.sendResetLink(email);
        res.json({ message });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

// Setzt das Passwort zurück
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const message = await PasswordService.resetPassword(token, newPassword);
        res.json({ message });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    sendResetLink,
    resetPassword,
};

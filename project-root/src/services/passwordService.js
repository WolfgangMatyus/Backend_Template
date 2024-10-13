const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const { sendEmail } = require('../utils/email'); // Eine Utility-Funktion, die E-Mails sendet
const { generateToken, verifyToken } = require('../security/jwt'); // Verwende deine bestehende JWT-Funktionen

const PasswordService = {
    async sendResetLink(email) {
        const user = await User.findOne({ 
            where: { email },
            include: [{ model: Role, as: 'role' }], 
        });
        if (!user) {
            throw new Error('Benutzer nicht gefunden');
        }

        const token = generateToken(user); // Token generieren
        const resetLink = `http://localhost:8080/reset/${token}`;

        // Sende E-Mail mit dem Link
        await sendEmail(user.email, resetLink);

        return 'Ein Link zum Zurücksetzen des Passworts wurde gesendet.';
    },

    async resetPassword(token, newPassword) {
        let userId;

        try {
            const decoded = verifyToken(token); // Verifizierung des Tokens und Dekodierung
            userId = decoded.id; // Extrahiere die Benutzer-ID
        } catch (error) {
            throw new Error('Ungültiger oder abgelaufener Token');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Benutzer nicht gefunden');
        }

        const password_hash = await bcrypt.hash(newPassword, 10);
        user.password_hash = password_hash;
        await user.save();

        return 'Passwort erfolgreich zurückgesetzt.';
    },
};

module.exports = PasswordService;

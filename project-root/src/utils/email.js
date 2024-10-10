const nodemailer = require('nodemailer');

// Konfiguration für den E-Mail-Versand
const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST, // E-Mail-Server, z.B. Gmail, SendGrid, etc.
    port: process.env.EMAIL_PORT, // Port des E-Mail-Servers, z.B. 587 für Gmail
    secure: process.env.EMAIL_PORT == 465, // true für 465, false für andere Ports
    auth: {
        user: process.env.EMAIL_USER, // E-Mail-Adresse
        pass: process.env.EMAIL_PASS, // E-Mail-Passwort
    },
    tls: {
        rejectUnauthorized: false // Deaktiviert die Zertifikatsüberprüfung (bei Bedarf)
    },
    debug: true,
});

console.log('Email Host:', process.env.EMAIL_HOST);
console.log('Email Port:', process.env.EMAIL_PORT);
console.log('Email User:', process.env.EMAIL_USER);


// Funktion zum Senden der E-Mail
const sendEmail = async (to, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // Absender-E-Mail-Adresse
        to: to, // Empfänger
        subject: 'Passwort zurücksetzen',
        text: `Bitte klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen: ${resetLink}`, // Text für die E-Mail
        html: `<p>Bitte klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:</p><p><a href="${resetLink}">${resetLink}</a></p>`, // HTML für die E-Mail
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`E-Mail gesendet an: ${to}`);
    } catch (error) {
        console.error(`Fehler beim Senden der E-Mail: ${error.message}`);
        throw new Error('Fehler beim Senden der E-Mail');
    }
};

module.exports = { sendEmail };

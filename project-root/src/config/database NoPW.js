const { Sequelize } = require('sequelize');

// Hier die Datenbankverbindungsdaten anpassen
const sequelize = new Sequelize('be_t_db', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres', // oder 'mysql', 'sqlite', etc. abhängig von deiner Datenbank
});

// Teste die Verbindung zur Datenbank
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Verbindung zur Datenbank erfolgreich.');
    } catch (error) {
        console.error('Fehler bei der Verbindung zur Datenbank:', error);
    }
}

testConnection();

module.exports = sequelize;

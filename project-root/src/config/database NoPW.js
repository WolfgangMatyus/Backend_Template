const { Sequelize } = require('sequelize');

// Hier die Datenbankverbindungsdaten
const sequelize = new Sequelize('be_t_db', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
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

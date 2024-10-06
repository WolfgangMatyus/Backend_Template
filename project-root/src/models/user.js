const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Stelle sicher, dass dieser Pfad korrekt ist

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    member_id: {
        type: DataTypes.UUID,
        references: {
            model: 'members', // Der Name der Referenztabelle
            key: 'id',       // Der Schlüssel in der Referenztabelle
        },
        onDelete: 'CASCADE', // Wenn das Mitglied gelöscht wird, wird auch der Benutzer gelöscht
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Sicherstellen, dass jede E-Mail-Adresse eindeutig ist
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false, // Das Passwort-Hash darf nicht null sein
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Standardwert für das Erstellungsdatum
    },
}, {
    tableName: 'users', // Der Name der Tabelle in der Datenbank
    timestamps: false,   // Wenn du die Timestamps nicht automatisch verwalten möchtest
});

module.exports = User;

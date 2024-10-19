// members.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    member_since: { // Neues Feld für "Mitglied seit"
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    address_id: {
        type: DataTypes.UUID,
        references: {
            model: 'addresses', // Name der Tabelle, auf die verwiesen wird
            key: 'id',
        },
        allowNull: true, // Kann null sein, falls kein Adressdatensatz vorhanden ist
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile_photo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    guardian_contact: { // Neues Feld für den Kontakt des Erziehungsberechtigten
        type: DataTypes.STRING,
        allowNull: true,
    },
    guardian_name: { // Neues Feld für den Namen des Erziehungsberechtigten
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'members', // Der Name der Tabelle in der Datenbank
    timestamps: true,     // Aktiviert automatische Timestamps
});

module.exports = Member;

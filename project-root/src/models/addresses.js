//addresses.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    house_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stair: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    door_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'addresses', // Der Name der Tabelle in der Datenbank
    timestamps: true,       // Aktiviert automatische Timestamps
});

module.exports = Address;

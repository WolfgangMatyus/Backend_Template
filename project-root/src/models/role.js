// src/models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Stelle sicher, dass dieser Pfad korrekt ist

// Rollen Modell
const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true, // Jede Rolle hat einen eindeutigen Namen
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

module.exports = Role;

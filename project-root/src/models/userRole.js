const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRole = sequelize.define('userRole', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'roles',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'user_roles',
    timestamps: false,
    indexes: [{
        unique: true,   // Primärschlüssel ist die Kombination aus user_id und role_id
        fields: ['user_id', 'role_id']
    }]
});

module.exports = UserRole;

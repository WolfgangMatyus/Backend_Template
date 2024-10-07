const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('../models/members');

const Contributions = sequelize.define('Contribution', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    member_id: {
        type: DataTypes.UUID,
        references: {
            model: Member,
            key: 'id',
        },
        allowNull: false,
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    timestamps: true,  // created_at und updated_at werden automatisch verwaltet
});

module.exports = Contributions;

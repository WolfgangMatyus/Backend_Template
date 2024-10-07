const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const contribution = require('./contributions');

const ContributionItem = sequelize.define('contributionItems', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    contribution_id: {
        type: DataTypes.UUID,
        references: {
            model: contribution,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',  // Wenn eine Contribution gelöscht wird, werden die zugehörigen Items auch gelöscht
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = ContributionItem;

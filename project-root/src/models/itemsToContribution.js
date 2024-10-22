const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Contribution = require('./contributions'); // Importiere das Contribution-Modell
const ContributionItem = require('./contributionItems'); // Importiere das ContributionItem-Modell
const ClothingItem = require('./clothingItems'); // Importiere das ClothingItem-Modell

const ItemsToContribution = sequelize.define('ItemsToContribution', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generiert eine UUID
        primaryKey: true,
    },
    contribution_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Contribution, // Referenziert die Contribution-Tabelle
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    contribution_item_id: {
        type: DataTypes.UUID,
        allowNull: true, // Kann null sein, wenn es sich um ein ClothingItem handelt
        references: {
            model: ContributionItem, // Referenziert die ContributionItems-Tabelle
            key: 'id',
        },
    },
    clothing_item_id: {
        type: DataTypes.UUID,
        allowNull: true, // Kann null sein, wenn es sich um ein ContributionItem handelt
        references: {
            model: ClothingItem, // Referenziert die ClothingItems-Tabelle
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Standardwert ist 1
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Der Gesamtbetrag für diese Position
    },
}, {
    tableName: 'items_to_contribution', // Name der Tabelle
    timestamps: true, // Automatisch verwaltet 'createdAt' und 'updatedAt'
});

module.exports = ItemsToContribution;

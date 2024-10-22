const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definiere das ContributionItem Modell
const ContributionItem = sequelize.define('contributionItems', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Bezeichnung des Beitragsitems, z.B. Mitgliedsbeitrag, Judocard',
    },
    member_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Mitgliederpreis für die jeweilige Position',
    },
    club_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Vereinspreis für die jeweilige Position',
    },
}, {
    tableName: 'contribution_items',  // Definiert den Tabellenname in der Datenbank
    timestamps: true,                 // createdAt und updatedAt Felder automatisch handhaben
});

module.exports = ContributionItem;

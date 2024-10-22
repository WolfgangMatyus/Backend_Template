const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importiere die Datenbankkonfiguration

// Definiere das Modell für ClothingItems
const ClothingItem = sequelize.define('ClothingItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generiert eine UUID
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false, // Bekleidungsart (z.B. Judogi, Gürtel)
        comment: 'Art der Bekleidung, z.B. Judogi, Gürtel',
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, da nicht alle Kleidungsstücke eine Größe haben
        comment: 'Größe der Kleidung, z.B. 100-110, 120 etc.',
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, falls Farbe nicht immer relevant ist
        comment: 'Farbe der Kleidung, z.B. Weiß, Blau',
    },
    member_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Mitgliedspreis
        comment: 'Preis für Mitglieder',
    },
    club_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Vereinspreis
        comment: 'Preis für den Verein',
    },
}, {
    tableName: 'clothing_items', // Name der Tabelle in der Datenbank
    timestamps: true, // Automatisch verwaltet 'createdAt' und 'updatedAt'
});

// Exportiere das Modell
module.exports = ClothingItem;

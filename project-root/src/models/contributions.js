const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importiere die Datenbankkonfiguration

// Definiere das Modell für Contributions
const Contribution = sequelize.define('Contribution', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generiere eine UUID
        primaryKey: true,
    },
    member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'members', // Der Name der referenzierten Tabelle
            key: 'id',
        },
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
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'paid', 'inactive']], // Erlaubte Statuswerte
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'contributions', // Der Name der Tabelle in der DB
    timestamps: false, // Wenn du keine timestamps (createdAt, updatedAt) benötigst
});

// Exportiere das Modell
module.exports = Contribution;

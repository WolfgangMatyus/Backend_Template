const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importiere die Datenbankkonfiguration
const ContributionItem = require('./contributionItems'); // Importiere das ContributionItem-Modell (für Assoziation)

// Definiere das Modell für Contributions
const Contribution = sequelize.define('Contribution', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generiert eine UUID
        primaryKey: true,
    },
    member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'members', // Name der referenzierten Tabelle 'members'
            key: 'id',
        },
        onDelete: 'CASCADE', // Wenn ein Mitglied gelöscht wird, lösche auch die zugehörigen Contributions
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Semester wie Sommersemester oder Wintersemester',
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear(), // Standardmäßig das aktuelle Jahr
        comment: 'Das Jahr der Contribution (z.B. 2024)',
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'Gesamter Betrag der Beitragsvorschreibung',
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fälligkeitsdatum der Zahlung',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'paid', 'inactive']], // Validierung: Erlaubte Statuswerte
        },
        comment: 'Status der Zahlung (z.B. pending, paid, inactive)',
    },
}, {
    tableName: 'contributions', // Der Tabellenname in der Datenbank
    timestamps: true, // Verwaltet automatisch createdAt und updatedAt
});

// Exportiere das Modell
module.exports = Contribution;

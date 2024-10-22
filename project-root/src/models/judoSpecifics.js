const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importiere deine bestehende Sequelize-Instanz
const Member = require('./members'); // Importiere das Member-Modell, wenn es so heißt

const JudoSpecifics = sequelize.define('JudoSpecifics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    member_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'members', // Verweis auf die Members-Tabelle
            key: 'id'
        },
        onDelete: 'CASCADE' // Lösche Judo-spezifische Daten, wenn das Mitglied gelöscht wird
    },
    jama_id: {
        type: DataTypes.STRING,
        allowNull: true // JAMA-ID ist optional
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false // Nationalität ist Pflicht
    },
    gender: {
        type: DataTypes.ENUM('m', 'w'),
        allowNull: false // Geschlecht ist Pflicht
    },
    age_group: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    max_fight_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    weight_class: {
        type: DataTypes.STRING,
        allowNull: true // Gewichtsklasse kann leer sein und wird dynamisch berechnet
    },
    last_judocard: {
        type: DataTypes.DATE,
        allowNull: true // Datum der letzten Judocard ist optional
    },
    max_training_level: {
        type: DataTypes.STRING,
        allowNull: true // Maximaler Kyu/Dan Grad ist Pflicht
    },
    training_date: {
        type: DataTypes.DATE,
        allowNull: true // Ausbildungsdatum optional
    },
    medical_certificate_date: {
        type: DataTypes.DATE,
        allowNull: true // Attestdatum optional
    },
    kyu_book_date: {
        type: DataTypes.DATE,
        allowNull: true // Kyuheft-Datum optional
    },
    certificate_status: {
        type: DataTypes.STRING,
        allowNull: true // Urkundenstatus ("ausständig", "")
    },
    judogi_size: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    belt_size: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'judo_specifics',
    timestamps: true
});

module.exports = JudoSpecifics;

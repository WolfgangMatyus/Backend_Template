const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./members');  // Importiere das Member-Modell für die Referenz

const ArchivedMember = sequelize.define('ArchivedMember', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    original_member_id: {
        type: DataTypes.UUID,
        references: {
            model: Member,
            key: 'id',
        },
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
    },
    address: {
        type: DataTypes.STRING,
    },
    postal_code: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    nationality: {
        type: DataTypes.STRING,
    },
    profile_photo: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,  // created_at und archived_at werden automatisch verwaltet
    createdAt: 'archived_at',  // Ändert den Namen der Spalte createdAt zu archived_at
});

module.exports = ArchivedMember;

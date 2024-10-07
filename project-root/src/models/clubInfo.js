const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClubInfo = sequelize.define('ClubInfo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    club_name: {
        type: DataTypes.STRING,
        defaultValue: 'UJC Sakura Yanagi JUDO',
        allowNull: false,
    },
    web_address: {
        type: DataTypes.STRING,
        defaultValue: 'http://www.sakura-yanagi-judo.at',
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: 'office@sakura-yanagi-judo.at',
        allowNull: false,
    },
    phone_trainer: {
        type: DataTypes.STRING,
        defaultValue: '+43 (0) 676 / 775 89 14',
        allowNull: false,
    },
    phone_office: {
        type: DataTypes.STRING,
        defaultValue: '+43 (0) 676 / 461 88 83',
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: 'Calvigasse 4/1/26, 1230 Wien',
        allowNull: false,
    },
    iban: {
        type: DataTypes.STRING(34),
        defaultValue: 'ATXX XXXX XXXX XXXX XXXX',
        allowNull: false,
    },
    bic: {
        type: DataTypes.STRING(11),
        defaultValue: 'XXXXATXX',
        allowNull: false,
    },
    logo_path: {
        type: DataTypes.TEXT,
        defaultValue: '/path/to/sakura-yanagi-judo_logo.png',
    },
}, {
    timestamps: false,  // Kein createdAt und updatedAt erforderlich
});

module.exports = ClubInfo;

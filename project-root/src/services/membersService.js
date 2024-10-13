// membersService.js
const sequelize = require('../config/database');
const Member = require('../models/members');
const { Address } = require('../models/associations');
const addressesService = require('../services/addressesService');

// Mitglied registrieren
const registerMemberService = async (memberData, addressData) => {
    // Schritt 1: Adresse überprüfen
    let address = await addressesService.findAddressByDetails(addressData);

    // Wenn die Adresse nicht existiert, neu anlegen
    if (!address) {
        address = await addressesService.createAddress(addressData);
    }

    // Schritt 2: Mitglied anlegen mit der Address-ID
    const member = await Member.create({
        ...memberData,
        address_id: address.id,  // Verknüpfen mit der Adresse
    });

    return member;
};

// Alle Mitglieder abrufen
const getAllMembersService = async () => {
    return await Member.findAll({
        include: [{
            model: Address,
            as: 'address', // Alias entsprechend der Definition in associations.js
        }],
    });
};

// Einzelnes Mitglied anhand der ID abrufen
const getMemberByIdService = async (id) => {
    try {
        const member = await Member.findOne({
            where: { id }, // Suche nach der ID
            include: [{
                model: Address,
                as: 'address', // Alias entsprechend der Definition in associations.js
                attributes: ['street', 'house_number', 'stair', 'door_number', 'postal_code', 'city', 'country'], // Nur relevante Adressfelder abrufen
            }],
        });
        return member || null; // Gibt null zurück, wenn kein Mitglied gefunden wurde
    } catch (error) {
        console.error('Fehler beim Abrufen des Mitglieds:', error);
        throw new Error('Fehler beim Abrufen des Mitglieds');
    }
};

// Mitglied anhand der ID finden
const findMemberById = async (id) => {
    return await Member.findByPk(id);
};


// Mitglied aktualisieren
const updateMemberService = async (id, memberData) => {
    const { first_name, last_name, date_of_birth, gender, member_since, guardian_name, guardian_contact, email, phone, nationality, address_id, } = memberData;

    try {
        // Mitglied aktualisieren
        const [numberOfAffectedRows, updatedMembers] = await Member.update(
            { first_name, last_name, date_of_birth, gender, member_since, guardian_name, guardian_contact, email, phone, nationality, address_id, },
            {
                where: { id },
                returning: true, // Gibt die aktualisierten Daten zurück
            }
        );

        if (numberOfAffectedRows === 0) {
            return null; // Gibt null zurück, wenn kein Mitglied aktualisiert wurde
        }

        return updatedMembers[0]; // Gibt das aktualisierte Mitglied zurück
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Mitglieds:', error);
        throw new Error('Fehler beim Aktualisieren des Mitglieds');
    }
};

// Exporte der Funktionen
module.exports = {
    findMemberById,
    updateMemberService,
};


// Mitglied löschen
const deleteMemberService = async (id) => {
    try {
        const result = await sequelize.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0 ? result.rows[0] : null; // Gibt null zurück, wenn kein Mitglied gefunden wurde
    } catch (error) {
        console.error('Fehler beim Löschen des Mitglieds:', error);
        throw new Error('Fehler beim Löschen des Mitglieds');
    }
};

module.exports = {
    findMemberById,
    registerMemberService,
    getAllMembersService,
    getMemberByIdService,
    updateMemberService,
    deleteMemberService,
};

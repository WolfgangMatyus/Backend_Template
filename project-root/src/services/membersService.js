// membersService.js
const Member = require('../models/members');
const JudoSpecifics = require('../models/judoSpecifics');
const { Address } = require('../models/associations');
const addressesService = require('../services/addressesService');

// Mitglied registrieren
const registerMember = async (memberData, addressData, judoSpecificsData) => {
    try {
        // Adresse erstellen oder finden
        let address = await addressesService.findAddressByDetails(addressData);
        if (!address) {
            address = await addressesService.createAddress(addressData);
        }

        // Mitglied erstellen
        const member = await Member.create({
            ...memberData,
            address_id: address.id,
        });

        // Judo-spezifische Daten erstellen
        const defaultDate = new Date(); 
        const judoSpecifics = await JudoSpecifics.create({
            ...judoSpecificsData,
            member_id: member.id,
            // Defaultwerte eintragen
            medical_certificate_date: judoSpecificsData.medical_certificate_date || defaultDate,
            kyu_book_date: judoSpecificsData.kyu_book_date || defaultDate,
            training_date: judoSpecificsData.training_date || defaultDate,
            last_judocard: judoSpecificsData.last_judocard || defaultDate,
        });

        return { member, judoSpecifics };
    } catch (error) {
        console.error('Fehler beim Registrieren des Mitglieds:', error);
        throw new Error('Fehler beim Registrieren des Mitglieds');
    }
};

// Alle Mitglieder abrufen
const getAllMembers= async () => {
    return await Member.findAll({
        include: [
            {
                model: Address,
                as: 'addresses', // Alias entsprechend der Definition in associations.js
            },
            {
                model: JudoSpecifics, // Judo-spezifische Daten einbeziehen
                as: 'judoSpecifics',  // Alias entsprechend der Definition in associations.js
            },
        ],
    });
};

// Einzelnes Mitglied anhand der ID abrufen
const getMemberById = async (id) => {
    try {
        const member = await Member.findOne({
            where: { id }, // Suche nach der ID
            include: [
                {
                    model: Address,
                    as: 'addresses', 
                },
                {
                    model: JudoSpecifics, 
                    as: 'judoSpecifics',  
                },
            ],
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
const updateMember= async (id, memberData, addresses, judoSpecificsData) => {
    const { first_name, last_name, date_of_birth, member_since, address_id, email, phone, profile_photo, guardian_name, guardian_contact, member_status, } = memberData;

    try {
        const existingMember = await Member.findOne({ where: { id } });

        if (!existingMember) {
            return null; // Falls kein Mitglied existiert
        }

        // Schritt 1: Mitgliedsdaten aktualisieren
        const [numberOfAffectedRows, updatedMembers] = await Member.update(
            {
                first_name,
                last_name,
                date_of_birth,
                member_since,
                address_id,
                email,
                phone,
                profile_photo,
                guardian_name,
                guardian_contact,
                member_status,
            },
            {
                where: { id },
                returning: true, // Gibt die aktualisierten Daten zurück
            }
        );

        // Selbst wenn numberOfAffectedRows === 0, geben wir das Mitglied zurück
        const updatedMember = updatedMembers[0] || existingMember;

        
        const existingJudoSpecifics = await JudoSpecifics.findOne({ where: { member_id: id } })

            
        if (existingJudoSpecifics) {
            // Judo-spezifische Daten aktualisieren
            await existingJudoSpecifics.update(judoSpecificsData);
        } else {
            // Neue Judo-spezifische Daten erstellen
            await JudoSpecifics.create({ member_id: id, ...judoSpecificsData });
        }

        // Adresse erstellen oder finden
        let address = await addressesService.findAddressByDetails(addresses);
        if (!address) {
            address = await addressesService.createAddress(addresses);
        } else {
            await addressesService.updateAddress(address.id, addresses);
        }
        
        return updatedMember; // Das aktualisierte Mitglied zurückgeben
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Mitglieds:', error);
        throw new Error('Fehler beim Aktualisieren des Mitglieds');
    }
};

// Mitglied löschen im Service
const deleteMember = async (memberId) => {
    try {
        // Lösche das Mitglied basierend auf der übergebenen ID
        const result = await Member.destroy({
            where: { id: memberId },
        });

        // Wenn kein Mitglied gelöscht wurde, gib null zurück
        if (result === 0) {
            return null;
        }

        return result;
    } catch (error) {
        console.error('Fehler beim Löschen des Mitglieds:', error);
        throw new Error('Fehler beim Löschen des Mitglieds');
    }
};

module.exports = {
    findMemberById,
    registerMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};

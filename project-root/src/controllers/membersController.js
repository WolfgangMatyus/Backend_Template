// membersController.js
const Address = require('../models/addresses');
const addressesService = require('../services/addressesService');

const {
    findMemberById,
    registerMemberService,
    getAllMembersService,
    getMemberByIdService,
    updateMemberService,
    deleteMemberService,
} = require('../services/membersService');

const registerMember = async (req, res) => {
    const { first_name, last_name, date_of_birth, gender, email, phone, nationality, guardian_name, guardian_contact } = req.body;
    const { street, house_number, stair, door_number, postal_code, city, country } = req.body;

    // Member-Daten
    const memberData = { first_name, last_name, date_of_birth, gender, email, phone, nationality, guardian_name, guardian_contact };

    // Address-Daten
    const addressData = { street, house_number, stair, door_number, postal_code, city, country };

    try {
        // Mitglied erstellen (und Adresse verknüpfen)
        const newMember = await registerMemberService(memberData, addressData);
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Fehler beim Erstellen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Erstellen des Mitglieds' });
    }
};

// Abrufen aller Mitglieder
const getAllMembers = async (req, res) => {
    try {
        // Abrufen aller Mitglieder und der zugehörigen Adressen
        const members = await getAllMembersService({
            include: [{
                model: Address,  // Hier wird die Address-Verknüpfung hinzugefügt
                as: 'address',   // Alias für die Verknüpfung
                attributes: ['street', 'house_number', 'stair', 'door_number', 'postal_code', 'city', 'country']  // Nur relevante Adressfelder abrufen
            }]
        });
        res.status(200).json(members);
    } catch (error) {
        console.error('Fehler beim Abrufen der Mitglieder:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Mitglieder: ' + error.message });
    }
};

// Abrufen eines einzelnen Mitglieds anhand der ID
const getMemberById = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await getMemberByIdService(id); // Hier den Service aufrufen
        if (!member) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error('Fehler beim Abrufen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen des Mitglieds: ' + error.message });
    }
};

const updateMember = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, date_of_birth, gender, member_since, guardian_name, guardian_contact, email, phone, nationality } = req.body;
    const { street, house_number, stair, door_number, postal_code, city, country } = req.body;

    // Member-Daten
    const memberData = { first_name, last_name, date_of_birth, gender, member_since, guardian_name, guardian_contact, email, phone, nationality };

    // Address-Daten
    const addressData = { street, house_number, stair, door_number, postal_code, city, country };

    try {
        // Schritt 1: Mitglied finden
        const existingMember = await findMemberById(id);
        if (!existingMember) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }

        // Schritt 2: Adresse überprüfen und aktualisieren oder neue Adresse erstellen
        let address = await addressesService.findAddressByDetails(addressData);
        if (!address) {
            address = await addressesService.createAddress(addressData);
        }

        // Schritt 3: Mitglied aktualisieren
        const updatedMember = await updateMemberService(id, {
            ...memberData,
            address_id: address.id, // Verknüpfung mit aktualisierter oder neuer Adresse
        });

        res.status(200).json({
            message: 'Mitglied erfolgreich aktualisiert',
            member: updatedMember,
        });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Mitglieds: ' + error.message });
    }
};


// Löschen eines Mitglieds anhand der ID
const deleteMember = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMember = await deleteMemberService(id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }

        res.status(200).json({
            message: 'Mitglied erfolgreich gelöscht',
            deletedMember,
        });
    } catch (error) {
        console.error('Fehler beim Löschen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Löschen des Mitglieds: ' + error.message });
    }
};

module.exports = {
    registerMember,
    updateMember,
    deleteMember,
    getMemberById,
    getAllMembers,
};

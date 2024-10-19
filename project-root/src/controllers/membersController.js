// membersController.js
const Address = require('../models/addresses');
const JudoSpecifics = require('../models/judoSpecifics');
const membersService = require('../services/membersService');

const registerMember = async (req, res) => {
    console.log(req.body);
    const { addresses, judoSpecifics  } = req.body;
    const memberData =  { member_since, first_name, last_name, date_of_birth, email, phone, guardian_name, guardian_contact, profile_photo } = req.body;

    try {
        const newMember = await membersService.registerMember(memberData, addresses, judoSpecifics);

        res.status(201).json({ message: "Mitglied erfolgreich erstellt", member: newMember });
    } catch (error) {
        console.error('Fehler beim Erstellen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Erstellen des Mitglieds' });
    }
};

// Abrufen aller Mitglieder
const getAllMembers = async (req, res) => {
    try {
        // Abrufen aller Mitglieder und der zugehörigen Adressen
        const members = await membersService.getAllMembers({
            include: [{
                        model: Address,  // Hier wird die Address-Verknüpfung hinzugefügt
                        as: 'addresses',   // Alias für die Verknüpfung
                    },
                    {
                        model: JudoSpecifics,
                        as: 'judoSpecifics',
                    }],
        });
        res.status(200).json(members);
    } catch (error) {
        console.error('Fehler beim Abrufen der Mitglieder:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Mitglieder: ' + error.message });
    }
};

// Abrufen eines einzelnen Mitglieds anhand der ID inklusive Addressdaten
const getMemberById = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await membersService.getMemberById(id); // Hier den Service aufrufen
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
    const { addresses, judoSpecifics  } = req.body;
    const memberData =  { first_name, last_name, date_of_birth, member_since, email, phone, guardian_name, guardian_contact, profile_photo, member_status } = req.body;

    try {
        const updatedMember = await membersService.updateMember(id, memberData, addresses, judoSpecifics);

        if (!updatedMember) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }

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
    try {
        const { id } = req.params;
        const deletedMember = await membersService.deleteMember(id);

        if (!deletedMember) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }

        res.status(200).json({ message: 'Mitglied erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Löschen des Mitglieds' });
    }
};

module.exports = {
    registerMember,
    updateMember,
    deleteMember,
    getMemberById,
    getAllMembers,
};

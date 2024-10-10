// membersController.js
const { insertAddress, addressExists } = require('../services/addressesService'); // Importiere addressExists
const {
    registerMember: registerMemberService,
    getAllMembers: getAllMembersService,
    getMemberById: getMemberByIdService,
    updateMember: updateMemberService,
    deleteMember: deleteMemberService,
} = require('../services/membersService');
const { sequelize } = require('../config/database'); // Importiere die Datenbankkonfiguration

const registerMember = async (req, res) => {
    const {
        firstName,
        lastName,
        dateOfBirth, 
        gender,
        memberSince,
        guardianName,
        guardianContact,
        address,
        email,
        phone,
        nationality
    } = req.body;

    const transaction = await sequelize.transaction(); // Start einer Transaktion
    try {
        // Überprüfen, ob die Adresse bereits existiert
        const exists = await addressExists(address); // Überprüfe, ob die Adresse existiert
        if (exists) {
            return res.status(400).json({ message: 'Diese Adresse existiert bereits.' });
        }

        // Zuerst die Adresse hinzufügen und die addressId zurückgeben
        const addressId = await insertAddress(address, { transaction }); // Einfügen der Adresse mit Transaktion

        // Nun das Mitglied registrieren
        const newMember = await registerMemberService({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            memberSince,
            guardianName,
            guardianContact,
            addressId,
            email,
            phone,
            nationality
        }, { transaction });

        await transaction.commit(); // Transaktion bestätigen

        res.status(201).json({
            message: 'Mitglied erfolgreich registriert',
            member: newMember,
        });
    } catch (error) {
        await transaction.rollback(); // Transaktion zurückrollen bei Fehler
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).json({ message: 'Fehler bei der Registrierung: ' + error.message });
    }
};

// Abrufen aller Mitglieder
const getAllMembers = async (req, res) => {
    try {
        const members = await getAllMembersService();
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
        const member = await getMemberByIdService(id);
        if (!member) {
            return res.status(404).json({ message: 'Mitglied nicht gefunden' });
        }
        res.status(200).json(member);
    } catch (error) {
        console.error('Fehler beim Abrufen des Mitglieds:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen des Mitglieds: ' + error.message });
    }
};

// Aktualisieren eines Mitgliedsprofils
const updateMember = async (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        memberSince,
        guardianName,
        guardianContact,
        addressId,
        email,
        phone,
        nationality
    } = req.body;

    // Validierung der erforderlichen Felder
    if (!firstName || !lastName || !dateOfBirth || !gender || !memberSince || !guardianName || !guardianContact || !email || !phone || !nationality) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
    }

    try {
        const updatedMember = await updateMemberService(id, {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            memberSince,
            guardianName,
            guardianContact,
            addressId,
            email,
            phone,
            nationality
        });

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

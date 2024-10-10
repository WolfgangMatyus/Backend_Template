// addressesController.js
const addressService = require('../services/addressesService');

// Holen aller Adressen
const getAllAddresses = async (req, res) => {
    try {
        const addresses = await addressService.getAllAddresses();
        res.status(200).json(addresses);
    } catch (error) {
        console.error('Fehler beim Abrufen der Adressen:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Adressen' });
    }
};

// Holen einer Adresse nach ID
const getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await addressService.getAddressById(id);
        if (!address) {
            return res.status(404).json({ message: 'Adresse nicht gefunden' });
        }
        res.status(200).json(address);
    } catch (error) {
        console.error('Fehler beim Abrufen der Adresse:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Adresse' });
    }
};

// Erstellen einer neuen Adresse
const createAddress = async (req, res) => {
    const { street, house_number, stair, door_number, postal_code, city, country } = req.body;
    try {
        const newAddress = await addressService.createAddress({ street, house_number, stair, door_number, postal_code, city, country });
        res.status(201).json(newAddress);
    } catch (error) {
        console.error('Fehler beim Erstellen der Adresse:', error);
        res.status(500).json({ message: 'Fehler beim Erstellen der Adresse' });
    }
};

// Aktualisieren einer Adresse
const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, house_number, stair, door_number, postal_code, city, country } = req.body;
    try {
        const updatedAddress = await addressService.updateAddress(id, { street, house_number, stair, door_number, postal_code, city, country });
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Adresse nicht gefunden' });
        }
        res.status(200).json(updatedAddress);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Adresse:', error);
        res.status(500).json({ message: 'Fehler beim Aktualisieren der Adresse' });
    }
};

// Löschen einer Adresse
const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await addressService.deleteAddress(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Adresse nicht gefunden' });
        }
        res.status(200).json({ message: 'Adresse ' + id + ' wurde gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen der Adresse:', error);
        res.status(500).json({ message: 'Fehler beim Löschen der Adresse' });
    }
};

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};

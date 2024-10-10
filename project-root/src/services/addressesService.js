// addressesService.js
const Address = require('../models/addresses');

// Holen aller Adressen
const getAllAddresses = async () => {
    return await Address.findAll();
};

// Holen einer Adresse nach ID
const getAddressById = async (id) => {
    return await Address.findByPk(id);
};

// Erstellen einer neuen Adresse
const createAddress = async (addressData) => {
    return await Address.create(addressData);
};

// Aktualisieren einer Adresse
const updateAddress = async (id, addressData) => {
    const address = await Address.findByPk(id);
    if (!address) {
        return null;
    }
    return await address.update(addressData);
};

// Löschen einer Adresse
const deleteAddress = async (id) => {
    const address = await Address.findByPk(id);
    if (!address) {
        return null;
    }
    await address.destroy();
    return true;
};

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
};

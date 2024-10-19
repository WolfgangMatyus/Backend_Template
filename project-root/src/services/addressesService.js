// addressesService.js
const Address = require('../models/addresses');

// Erstellen einer neuen Adresse
const createAddress = async (addressData) => {
    // console.log('Service: ', addressData);
    if (!addressData || !addressData.street) {
        throw new Error('Fehlende Adressdaten im Service');
    }
    return await Address.create(addressData);
};

// Holen aller Adressen
const getAllAddresses = async () => {
    return await Address.findAll();
};

// Holen einer Adresse nach ID
const getAddressById = async (id) => {
    return await Address.findByPk(id);
};

// Funktion zum Überprüfen, ob eine Adresse bereits existiert
const findAddressByDetails = async (addressData) => {
    if (!addressData || !addressData.street) {
        throw new Error('Adressdaten oder Straßenangaben fehlen');
    }

    return await Address.findOne({
        where: {
            street: addressData.street,
            house_number: addressData.house_number,
            postal_code: addressData.postal_code,
            city: addressData.city,
            country: addressData.country,
        }
    });
};

// Aktualisieren einer Adresse
const updateAddress = async (id, addressData) => {
    const address = await Address.findByPk(id);
    if (!address) {
        throw new Error('Adresse nicht gefunden');
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
    findAddressByDetails,
    createAddress,
    updateAddress,
    deleteAddress
};

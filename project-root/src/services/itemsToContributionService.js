const ItemsToContribution = require('../models/itemsToContribution');

// Beitragsposten erstellen
const createItemsToContribution = async (data) => {
    return await ItemsToContribution.create(data);
};

// Alle Beitragsposten abrufen
const getAllItemsToContribution = async () => {
    return await ItemsToContribution.findAll();
};

// Beitragsposten nach ID abrufen
const getItemsToContributionItemById = async (id) => {
    return await ItemsToContribution.findByPk(id);
};

// Beitragsposten aktualisieren
const updateItemsToContribution = async (id, data) => {
    const item = await ItemsToContribution.findByPk(id);
    if (!item) {
        return null;
    }
    return await item.update(data);
};

// Beitragsposten löschen
const deleteItemsToContribution = async (id) => {
    const item = await ItemsToContribution.findByPk(id);
    if (!item) {
        return null;
    }
    await item.destroy();
    return true;
};

module.exports = { createItemsToContribution, getAllItemsToContribution, getItemsToContributionItemById, updateItemsToContribution, deleteItemsToContribution };

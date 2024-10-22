const ContributionItem = require('../models/contributionItems');

// Beitragsposten erstellen
const createContributionItem = async (data) => {
    return await ContributionItem.create(data);
};

// Alle Beitragsposten abrufen
const getAllContributionItems = async () => {
    try {
        const items = await ContributionItem.findAll();
        return items;
    } catch (error) {
        throw new Error('Fehler beim Abrufen der Beitragsposten'); // Fehlerbehandlung
    }
};

// Beitragsposten nach ID abrufen
const getContributionItemById = async (id) => {
    return await ContributionItem.findByPk(id);
};

// Beitragsposten aktualisieren
const updateContributionItem = async (id, data) => {
    const item = await ContributionItem.findByPk(id);
    if (!item) {
        return null;
    }
    return await item.update(data);
};

// Beitragsposten löschen
const deleteContributionItem = async (id) => {
    const item = await ContributionItem.findByPk(id);
    if (!item) {
        return null;
    }
    await item.destroy();
    return true;
};

module.exports = { createContributionItem, getAllContributionItems, getContributionItemById, updateContributionItem, deleteContributionItem };

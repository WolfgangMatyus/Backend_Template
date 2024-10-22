const ClothingItems = require('../models/clothingItems');

// Beitragsposten erstellen
const createClothingItem = async (data) => {
    return await ClothingItems.create(data);
};

// Alle Beitragsposten abrufen
const getAllClothingItems = async () => {
    return await ClothingItems.findAll();
};

// Beitragsposten nach ID abrufen
const getClothingItemById = async (id) => {
    return await ClothingItems.findByPk(id);
};

// Beitragsposten aktualisieren
const updateClothingItem = async (id, data) => {
    const item = await ClothingItems.findByPk(id);
    if (!item) {
        return null;
    }
    return await item.update(data);
};

// Beitragsposten löschen
const deleteClothingItem = async (id) => {
    const item = await ClothingItems.findByPk(id);
    if (!item) {
        return null;
    }
    await item.destroy();
    return true;
};

module.exports = { createClothingItem, getAllClothingItems, getClothingItemById, updateClothingItem, deleteClothingItem };

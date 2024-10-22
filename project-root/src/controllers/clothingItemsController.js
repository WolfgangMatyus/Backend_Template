const clothingItemsService = require('../services/clothingItemsService');

// Bekleidungsposten erstellen
const createClothingItem = async (req, res) => {
    try {
        const item = await clothingItemsService.createClothingItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Bekleidungspostens.', error });
    }
};

// Alle Bekleidungsposten abrufen
const getAllClothingItems = async (req, res) => {
    try {
        const items = await clothingItemsService.getAllClothingItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Bekleidungsposten.', error });
    }
};

// Bekleidungsposten nach ID abrufen
const getClothingItemById = async (req, res) => {
    try {
        const item = await clothingItemsService.getClothingItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Bekleidungsposten nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Bekleidungsposten.', error });
    }
};

// Bekleidungsposten aktualisieren
const updateClothingItem = async (req, res) => {
    try {
        const item = await clothingItemsService.updateClothingItem(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ message: 'Bekleidungsposten nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Bekleidungsposten.', error });
    }
};

// Bekleidungsposten löschen
const deleteClothingItem = async (req, res) => {
    try {
        const result = await clothingItemsService.deleteClothingItem(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Bekleidungsposten nicht gefunden.' });
        }
        res.status(200).json({ message: 'Bekleidungsposten erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Bekleidungsposten.', error });
    }
};

module.exports = { createClothingItem, getAllClothingItems, getClothingItemById, updateClothingItem, deleteClothingItem };

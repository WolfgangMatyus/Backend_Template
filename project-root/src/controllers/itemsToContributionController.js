const itemsToContributionService = require('../services/ItemsToContributionService');

// Positionen in einem Beitrag erstellen
const createItemsToContribution = async (req, res) => {
    try {
        const item = await itemsToContributionService.createitemsToContribution(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen der Positionen in einem Beitrag.', error });
    }
};

// Alle Positionen in einem Beitrag abrufen
const getAllItemsToContribution = async (req, res) => {
    try {
        const items = await itemsToContributionService.getitemsToContribution();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Positionen in einem Beitrag.', error });
    }
};

// Positionen in einem Beitrag nach ID abrufen
const getItemsToContributionById = async (req, res) => {
    try {
        const item = await itemsToContributionService.getitemsToContributionmById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Positionen in einem Beitrag nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Positionen in einem Beitrag.', error });
    }
};

// Positionen in einem Beitrag aktualisieren
const updateItemsToContribution = async (req, res) => {
    try {
        const item = await itemsToContributionService.updateitemsToContribution(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ message: 'Positionen in einem Beitrag nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Positionen in einem Beitrag.', error });
    }
};

// Positionen in einem Beitrag löschen
const deleteItemsToContribution = async (req, res) => {
    try {
        const result = await itemsToContributionService.deleteitemsToContribution(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Positionen in einem Beitrag nicht gefunden.' });
        }
        res.status(200).json({ message: 'Positionen in einem Beitrag erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Positionen in einem Beitrag.', error });
    }
};

module.exports = { createItemsToContribution, getAllItemsToContribution, getItemsToContributionById, updateItemsToContribution, deleteItemsToContribution };

const contributionItemService = require('../services/contributionItemsService');

// Beitragsposten erstellen
const createContributionItem = async (req, res) => {
    try {
        const item = await contributionItemService.createContributionItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Beitragspostens.', error });
    }
};

// Alle Beitragsposten abrufen
const getAllContributionItems = async (req, res) => {
    try {
        const items = await contributionItemService.getAllContributionItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Beitragsposten.', error });
    }
};

// Beitragsposten nach ID abrufen
const getContributionItemById = async (req, res) => {
    try {
        const item = await contributionItemService.getContributionItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Beitragsposten nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Beitragspostens.', error });
    }
};

// Beitragsposten aktualisieren
const updateContributionItem = async (req, res) => {
    try {
        const item = await contributionItemService.updateContributionItem(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ message: 'Beitragsposten nicht gefunden.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Beitragspostens.', error });
    }
};

// Beitragsposten löschen
const deleteContributionItem = async (req, res) => {
    try {
        const result = await contributionItemService.deleteContributionItem(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Beitragsposten nicht gefunden.' });
        }
        res.status(200).json({ message: 'Beitragsposten erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Beitragspostens.', error });
    }
};

module.exports = { createContributionItem, getAllContributionItems, getContributionItemById, updateContributionItem, deleteContributionItem };

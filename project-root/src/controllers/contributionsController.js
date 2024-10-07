const contributionService = require('../services/contributionService');

// Beitrag erstellen
const createContribution = async (req, res) => {
    try {
        const contribution = await contributionService.createContribution(req.body);
        res.status(201).json(contribution);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Beitrags.', error });
    }
};

// Alle Beiträge abrufen
const getAllContributions = async (req, res) => {
    try {
        const contributions = await contributionService.getAllContributions();
        res.status(200).json(contributions);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Beiträge.', error });
    }
};

// Beitrag nach ID abrufen
const getContributionById = async (req, res) => {
    try {
        const contribution = await contributionService.getContributionById(req.params.id);
        if (!contribution) {
            return res.status(404).json({ message: 'Beitrag nicht gefunden.' });
        }
        res.status(200).json(contribution);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Beitrags.', error });
    }
};

// Beitrag aktualisieren
const updateContribution = async (req, res) => {
    try {
        const contribution = await contributionService.updateContribution(req.params.id, req.body);
        if (!contribution) {
            return res.status(404).json({ message: 'Beitrag nicht gefunden.' });
        }
        res.status(200).json(contribution);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Beitrags.', error });
    }
};

// Beitrag löschen
const deleteContribution = async (req, res) => {
    try {
        const result = await contributionService.deleteContribution(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Beitrag nicht gefunden.' });
        }
        res.status(200).json({ message: 'Beitrag erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Beitrags.', error });
    }
};

module.exports = { createContribution, getAllContributions, getContributionById, updateContribution, deleteContribution };

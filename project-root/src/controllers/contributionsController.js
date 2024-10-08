// contributionsController.js

const contributionsService = require('../services/contributionsService');

// Beitrag erstellen
const createContribution = async (req, res) => {
    try {
        const contribution = await contributionsService.createContribution(req.body);
        res.status(201).json(contribution);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Beitrags.', error });
    }
};

// Alle Beiträge abrufen
const getAllContributions = async (req, res) => {
    try {
        const contributions = await contributionsService.getAllContributions();
        res.status(200).json(contributions);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Beiträge.', error });
    }
};

// Beitrag nach ID abrufen
const getContributionById = async (req, res) => {
    console.log('Anfrage für Beitrag ID:', req.params.id);
    try {
        const contribution = await contributionsService.getContributionById(req.params.id);
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
        const contribution = await contributionsService.updateContribution(req.params.id, req.body);
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
        const result = await contributionsService.deleteContribution(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Beitrag nicht gefunden.' });
        }
        res.status(200).json({ message: 'Beitrag erfolgreich gelöscht.' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Beitrags.', error });
    }
};

// PDF generieren
const generateContributionPDF = async (req, res) => {
    console.log('PDF-Generierung aufgerufen für Beitrag ID:', req.params.id);
    try {
        const contributionId = req.params.id;
        console.log(`Beitrag ID: ${contributionId}`);
        const { filename, filePath } = await contributionsService.generateContributionPDF(req.params.id);

        if (!contribution) {
            console.log(`Kein Beitrag mit ID: ${contributionId}`);
            return res.status(404).json({ message: 'Beitrag nicht gefunden.' });
        }

        res.status(200).send({ message: 'PDF erfolgreich erstellt', filename, filePath });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des PDFs.', error: error.message });
    }
};

module.exports = { createContribution, getAllContributions, getContributionById, updateContribution, deleteContribution, generateContributionPDF };

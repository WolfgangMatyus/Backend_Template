const Contribution = require('../models/contributions');

// Beitrag erstellen
const createContribution = async (data) => {
    return await MemberContribution.create(data);
};

// Alle Beiträge abrufen
const getAllContributions = async () => {
    return await MemberContribution.findAll();
};

// Beitrag nach ID abrufen
const getContributionById = async (id) => {
    return await MemberContribution.findByPk(id);
};

// Beitrag aktualisieren
const updateContribution = async (id, data) => {
    const contribution = await MemberContribution.findByPk(id);
    if (!contribution) {
        return null;
    }
    return await contribution.update(data);
};

// Beitrag löschen
const deleteContribution = async (id) => {
    const contribution = await MemberContribution.findByPk(id);
    if (!contribution) {
        return null;
    }
    await contribution.destroy();
    return true;
};

module.exports = { createContribution, getAllContributions, getContributionById, updateContribution, deleteContribution };

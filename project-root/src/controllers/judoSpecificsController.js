const JudoSpecificsService = require('../services/judoSpecificsService');

// Judo-spezifische Daten für ein Mitglied erstellen
const createJudoSpecifics = async (req, res) => {
  try {
    const judoSpecifics = await JudoSpecificsService.createJudoSpecifics(req.body);
    return res.status(201).json(judoSpecifics);
  } catch (error) {
    console.error('Error creating Judo specifics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Judo-spezifische Daten für ein Mitglied abrufen
const getJudoSpecificsByMemberId = async (req, res) => {
  try {
    const { member_id } = req.params;
    const judoSpecifics = await JudoSpecificsService.getJudoSpecificsByMemberId(member_id);
    if (!judoSpecifics) {
      return res.status(404).json({ message: 'Judo specifics not found' });
    }
    return res.status(200).json(judoSpecifics);
  } catch (error) {
    console.error('Error fetching Judo specifics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Judo-spezifische Daten für ein Mitglied aktualisieren
const updateJudoSpecifics = async (req, res) => {
  try {
    const { member_id } = req.params;
    const updatedJudoSpecifics = await JudoSpecificsService.updateJudoSpecifics(member_id, req.body);
    if (!updatedJudoSpecifics) {
      return res.status(404).json({ message: 'Judo specifics not found' });
    }
    return res.status(200).json(updatedJudoSpecifics);
  } catch (error) {
    console.error('Error updating Judo specifics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Judo-spezifische Daten für ein Mitglied löschen
const deleteJudoSpecifics = async (req, res) => {
  try {
    const { member_id } = req.params;
    const deleted = await JudoSpecificsService.deleteJudoSpecifics(member_id);
    if (!deleted) {
      return res.status(404).json({ message: 'Judo specifics not found' });
    }
    return res.status(200).json({ message: 'Judo specifics deleted successfully' });
  } catch (error) {
    console.error('Error deleting Judo specifics:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    createJudoSpecifics,
    getJudoSpecificsByMemberId,
    updateJudoSpecifics,
    deleteJudoSpecifics,
};

const JudoSpecifics = require('../models/judoSpecifics');

// Judo-spezifische Daten erstellen
const createJudoSpecifics = async (data) => {
  return await JudoSpecifics.create(data);
};

// Judo-spezifische Daten nach Member-ID abrufen
const getJudoSpecificsByMemberId = async (member_id) => {
  return await JudoSpecifics.findOne({ where: { member_id } });
};

// Judo-spezifische Daten aktualisieren
const updateJudoSpecifics = async (member_id, data) => {
  const judoSpecifics = await JudoSpecifics.findOne({ where: { member_id } });
  if (!judoSpecifics) {
    return null;
  }
  return await judoSpecifics.update(data);
};

// Judo-spezifische Daten löschen
const deleteJudoSpecifics = async (member_id) => {
  const judoSpecifics = await JudoSpecifics.findOne({ where: { member_id } });
  if (!judoSpecifics) {
    return null;
  }
  await judoSpecifics.destroy();
  return true;
};

module.exports = {
    createJudoSpecifics,
    getJudoSpecificsByMemberId,
    updateJudoSpecifics,
    deleteJudoSpecifics,
};
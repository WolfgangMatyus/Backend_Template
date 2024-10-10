const sequelize = require('../config/database');

// Förderungsansuchen erstellen
const applyForGrant = async (req, res) => {
  const { memberId, grantType, amount, description } = req.body;

  try {
    const result = await sequelize.query(
      'INSERT INTO grants (member_id, grant_type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [memberId, grantType, amount, description]
    );
    
    res.status(201).json({
      message: 'Förderungsansuchen erfolgreich erstellt',
      grant: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Erstellen des Förderungsansuchens' });
  }
};

module.exports = {
  applyForGrant
};

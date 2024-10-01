const pool = require('../config/db_pg');

// Erstellen eines neuen Blogposts
const createBlogPost = async (req, res) => {
  const { title, description, date, location } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO blog_posts (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, date, location]
    );
    
    res.status(201).json({
      message: 'Blogpost erfolgreich erstellt',
      post: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Erstellen des Blogposts' });
  }
};

// Abrufen aller Blogposts
const getAllBlogPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Blogposts' });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts
};

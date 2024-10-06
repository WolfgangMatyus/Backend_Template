const express = require('express');
const { createBlogPost, getAllBlogPosts } = require('../controllers/newsController');
const router = express.Router();

// POST /api/v1/news - Neuen Blogpost erstellen
router.post('/', createBlogPost);

// GET /api/v1/news - Alle Blogposts abrufen
router.get('/', getAllBlogPosts);

module.exports = router;

// src/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'test_members_db' : 'be_t_db', // Setze die Testdatenbank
  password: process.env.DB_PASSWORD || 'PG_Admin',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;

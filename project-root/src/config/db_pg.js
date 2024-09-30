const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'be_t_db',
  password: 'PG_Admin',
  port: 5432,
});

module.exports = pool;

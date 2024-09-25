const { Pool } = require('pg');

const pool = new Pool({
  user: 'be_t_db_user',
  host: 'localhost',
  database: 'be_t_db',
  password: 'be_t_db_pw',
  port: 5432,
});

module.exports = pool;

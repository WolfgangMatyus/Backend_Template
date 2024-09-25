const pool = require('../src/config/db'); // Der Pfad zu deiner db.js

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
  } else {
    console.log('Datenbankverbindung erfolgreich:', res.rows);
  }
  pool.end();
});

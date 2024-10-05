const pool = require('../src/config/db'); // Der Pfad zu deiner db.js

describe('Database Connection', () => {
    // Testet die Verbindung zur Datenbank
    it('should test database connection', async () => {
        try {
            const res = await pool.query('SELECT NOW()');
            expect(res).toHaveProperty('rows');
            expect(res.rows.length).toBeGreaterThan(0);
            console.log('Datenbankverbindung erfolgreich:', res.rows);
        } catch (err) {
            console.error('Fehler bei der Datenbankverbindung:', err.message); // Bessere Fehlerbehandlung
            throw err; // Damit der Test fehlschlägt, falls ein Fehler auftritt
        } finally {
            await pool.end(); // Stelle sicher, dass die Verbindung ordnungsgemäß geschlossen wird
        }
    });
});

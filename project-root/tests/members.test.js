const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../src/routes/members');
const pool = require('../src/config/db'); // Verbindung zur Datenbank importieren

// Erstelle eine Test-Instanz der Express-App
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/members', membersRoute);

// Mock-Daten für die Tests
const mockMember = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  address: '123 Test Street',
  email: 'john.doe@example.com',
  phone: '1234567890'
};

beforeAll(async () => {
  // Erstelle die members Tabelle, wenn sie nicht existiert
  await pool.query(`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100),
      birthdate DATE
    );
  `);

  // Füge einen Dummy-Eintrag hinzu
  await pool.query(`
    INSERT INTO members (first_name, last_name, email, birthdate)
    VALUES ('John', 'Doe', 'john.doe@example.com', '1990-01-01');
  `);
});

afterAll(async () => {
  // Lösche die Tabelle nach den Tests, um den Zustand wiederherzustellen
  await pool.query(`DROP TABLE IF EXISTS members;`);
  await pool.end(); // Schließe die Datenbankverbindung
});

describe('POST /api/v1/members', () => {
  it('should register a new member successfully', async () => {
    const response = await request(app)
      .post('/api/v1/members')
      .send(mockMember);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('member');
    expect(response.body.member.first_name).toBe(mockMember.firstName);
    expect(response.body.member.last_name).toBe(mockMember.lastName);
  });

  it('should return a 400 status if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/v1/members')
      .send({
        firstName: 'John', // lastName fehlt absichtlich
        email: 'john.doe@example.com'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Bitte füllen Sie alle Pflichtfelder aus.');
  });

  it('should return 500 status for internal server errors', async () => {
    // Simuliere einen Serverfehler
    jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .post('/api/v1/members')
      .send(mockMember);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Fehler bei der Registrierung');
  });
});

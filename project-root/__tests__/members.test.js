const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../routes/members'); // Importiere die Route

// Erstelle eine Test-Instanz der Express-App
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/members', membersRoute); // Füge die Route hinzu

// Mock-Daten für die Tests
const mockMember = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  address: '123 Test Street',
  email: 'john.doe@example.com',
  phone: '1234567890'
};

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
    const response = await request(app)
      .post('/api/v1/members')
      .send(mockMember);

    // Simuliere einen Serverfehler (z.B. bei Datenbankproblemen)
    jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Database error'));
    
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message', 'Fehler bei der Registrierung');
  });
});

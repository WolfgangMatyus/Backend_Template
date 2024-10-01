const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../src/routes/members');
const pool = require('../src/config/db');// Stelle sicher, dass du deine Express-App importierst

describe('POST /api/v1/members', () => {
  it('sollte ein neues Mitglied registrieren', async () => {
    const newMember = {
      firstName: 'Max',
      lastName: 'Mustermann',
      dateOfBirth: '2000-01-01',
      address: 'Musterstraße 1',
      email: 'max@mustermann.de',
      phone: '0123456789'
    };

    const response = await request(app)
      .post('/api/v1/members')
      .send(newMember)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201); // Überprüfe, ob der Statuscode 201 ist
    expect(response.body).toHaveProperty('message', 'Mitglied erfolgreich registriert'); // Überprüfe die Nachricht
    expect(response.body.member).toHaveProperty('id'); // Überprüfe, ob die ID zurückgegeben wird
    expect(response.body.member.first_name).toBe(newMember.firstName); // Überprüfe, ob der Vorname korrekt ist
    expect(response.body.member.last_name).toBe(newMember.lastName); // Überprüfe, ob der Nachname korrekt ist
  });
});

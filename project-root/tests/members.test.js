const request = require('supertest');
const app = require('./testApp'); // Stelle sicher, dass du die Haupt-App exportierst

describe('Members API', () => {
    let memberId;

    // Testet die Registrierung eines neuen Mitglieds (POST)
    it('should register a new member', async () => {
        const res = await request(app)
            .post('/api/v1/members')
            .send({
                firstName: 'Max',
                lastName: 'Mustermann',
                dateOfBirth: '1990-01-01',
                address: '123 Main St',
                email: 'max.mustermann@example.com',
                phone: '123456789',
                postal_code: '12345',
                nation: 'austria',
                city: 'Vienna'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('member');
        memberId = res.body.member.id; // Speichere die ID für zukünftige Tests
    });

    // Testet das Abrufen aller Mitglieder (GET)
    it('should get all members', async () => {
        const res = await request(app).get('/api/v1/members');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Testet das Abrufen eines einzelnen Mitglieds (GET /:id)
    it('should get a member by ID', async () => {
        const res = await request(app).get(`/api/v1/members/${memberId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', memberId);
    });

    // Testet das Aktualisieren eines Mitglieds (PUT /:id)
    it('should update a member', async () => {
        const res = await request(app)
            .put(`/api/v1/members/${memberId}`)
            .send({
                firstName: 'Mimi',
                lastName: 'musterfrau',
                dateOfBirth: '1990-01-01',
                address: '456 Another St',
                email: 'Mimi.musterfrau@example.com',
                phone: '987654321',
                postal_code: '67890',
                nation: 'germany',
                city: 'Graz'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.member).toHaveProperty('first_name', 'Mimi');
    });

    // Testet das Löschen eines Mitglieds (DELETE /:id)
    it('should delete a member', async () => {
        const res = await request(app).delete(`/api/v1/members/${memberId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Mitglied erfolgreich gelöscht');
    });
});

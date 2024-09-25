### POST /api/v1/members

- Beschreibung: Registriert ein neues Mitglied
- Request:
  - Methode: POST
  - URL: `/api/v1/members`
  - Header: `Content-Type: application/json`
  - Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01",
      "address": "123 Test Street",
      "email": "john.doe@example.com",
      "phone": "1234567890"
    }
    ```
- Response:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "message": "Mitglied erfolgreich registriert",
      "member": {
        "first_name": "John",
        "last_name": "Doe",
        "date_of_birth": "1990-01-01",
        "address": "123 Test Street",
        "email": "john.doe@example.com",
        "phone": "1234567890"
      }
    }
    ```
- Fehlerfälle:
  - `400 Bad Request`: Wenn Pflichtfelder fehlen oder das Format falsch ist.
  - `500 Internal Server Error`: Bei Datenbankfehlern oder anderen internen Problemen.

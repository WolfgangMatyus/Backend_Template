// validateUserInput.js
const validateUserInput = (req, res, next) => {
    const {
        email,
        password,
        memberId,
        first_name,
        last_name,
        date_of_birth,
        phone,
        house_number,
        postal_code,
        city,
        country,
        jama_id,
    } = req.body;

    const missingFields = []; // Array für fehlende Felder
    const invalidFields = []; // Array für ungültige Felder

    // Überprüfe, ob die erforderlichen Felder ausgefüllt sind
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!first_name) missingFields.push('first_name');
    if (!last_name) missingFields.push('last_name');
    if (!date_of_birth) missingFields.push('date_of_birth');
    if (!phone) missingFields.push('phone');
    if (!house_number) missingFields.push('house_number');
    if (!postal_code) missingFields.push('postal_code');
    if (!city) missingFields.push('city');
    if (!country) missingFields.push('country');

    // Validierung für optionale Felder
    if (memberId && !isValidUUID(memberId)) invalidFields.push('memberId (ungültige UUID)');
    if (jama_id && typeof jama_id !== 'string') invalidFields.push('jama_id (muss ein String sein)');

    // Weitere Validierungen
    if (email && !isValidEmail(email)) invalidFields.push('email (ungültiges Format)');
    if (password && password.length < 8) invalidFields.push('password (muss mindestens 8 Zeichen lang sein)');
    if (phone && !isValidPhoneNumber(phone)) invalidFields.push('phone (ungültiges Format)');
    if (date_of_birth && !isValidDate(date_of_birth)) invalidFields.push('date_of_birth (ungültiges Datumsformat)');
    if (postal_code && !isValidPostalCode(postal_code)) invalidFields.push('postal_code (ungültiges Format)');

    // Wenn es fehlende oder ungültige Felder gibt, gib eine detaillierte Fehlermeldung zurück
    if (missingFields.length > 0 || invalidFields.length > 0) {
        return res.status(400).json({ 
            message: 'Validierungsfehler',
            missingFields: missingFields.length > 0 ? `Fehlende Felder: ${missingFields.join(', ')}` : undefined,
            invalidFields: invalidFields.length > 0 ? `Ungültige Felder: ${invalidFields.join(', ')}` : undefined
        });
    }

    next(); // Weiter zur nächsten Middleware oder Route
};

// Funktion zur Überprüfung, ob eine ID eine gültige UUID ist
const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

// Funktion zur Überprüfung, ob eine E-Mail gültig ist
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Funktion zur Überprüfung, ob ein Datum gültig ist (YYYY-MM-DD Format)
const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString) && !isNaN(new Date(dateString).getTime());
};

// Funktion zur Überprüfung, ob eine Telefonnummer gültig ist
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]{7,15}$/; // Akzeptiert internationale Formate und längenabhängig
    return phoneRegex.test(phone);
};

// Funktion zur Überprüfung, ob eine Postleitzahl gültig ist
const isValidPostalCode = (postalCode) => {
    const postalCodeRegex = /^[0-9]{4,5}$/; // Kann an das Land angepasst werden
    return postalCodeRegex.test(postalCode);
};

module.exports = { validateUserInput };

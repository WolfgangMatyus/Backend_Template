// contributionsSercivece.js
const Contribution = require('../models/contributions');
const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');


// Beitrag erstellen
const createContribution = async (data) => {
    return await Contribution.create(data);
};

// Alle Beiträge abrufen
const getAllContributions = async () => {
    return await Contribution.findAll();
};

// Beitrag nach ID abrufen
const getContributionById = async (id) => {
    return await Contribution.findOne({
        where: { id },
    });
};

// Beitrag aktualisieren
const updateContribution = async (id, data) => {
    const contribution = await Contribution.findByPk(id);
    if (!contribution) {
        return null;
    }
    return await contribution.update(data);
};

// Beitrag löschen
const deleteContribution = async (id) => {
    const contribution = await Contribution.findByPk(id);
    if (!contribution) return null;
    await contribution.destroy();
    return true;
};

const getClubInfo = async () => {
    const query = 'SELECT * FROM club_info LIMIT 1';
    const [results] = await sequelize.query(query);  // Die Ergebnisse befinden sich im ersten Element des Arrays
    return results[0]; // Das erste Objekt der Ergebnismenge zurückgeben
};


// Funktion zur Generierung des PDFs
const generateContributionPDF = async (contributionId) => {
    const contribution = await getContributionById(contributionId);
    console.log('Contribution:', contribution);
    
    if (!contribution) {
        throw new Error('Beitrag nicht gefunden.');
    }

    // Hole die statischen Vereinsinformationen aus der Datenbank
    const clubInfo = await getClubInfo();

    if (!clubInfo) {
        throw new Error('Vereinsinformationen nicht gefunden.');
    }

    // PDF-Generierung
    const pdfDoc = new pdfkit();
    const filename = `Beitragsvorschreibung_${contributionId}.pdf`;
    const filePath = path.join(__dirname, '../../uploads/contributions', filename);
    pdfDoc.pipe(fs.createWriteStream(filePath));

    // Verwende die Daten aus club_info
    pdfDoc.text(`${clubInfo.club_name}`);
    pdfDoc.text(`Web: ${clubInfo.web_address}`);
    pdfDoc.text(`E-Mail: ${clubInfo.email}`);
    pdfDoc.text(`Tel-Trainer: ${clubInfo.phone_trainer}`);
    pdfDoc.text(`Tel-Office: ${clubInfo.phone_office}`);
    pdfDoc.text(`Postadresse: ${clubInfo.address}`);
    pdfDoc.moveDown();

    // Daten des Mitglieds
    pdfDoc.text(`An:`);
    pdfDoc.text(`${contribution.memberName || 'Unbekannt'}`);
    pdfDoc.text(`${contribution.memberAddress || 'Unbekannte Adresse'} ${contribution.memberCity || ''}`);
    pdfDoc.text(`${contribution.memberPostalCode || ''} ${contribution.memberCity || ''}`);
    pdfDoc.text(`Datum: ${new Date().toLocaleDateString()}`);
    pdfDoc.moveDown();

    // Mitgliedsbeitrag
    pdfDoc.fontSize(18).text(`Mitgliedsbeitrag für das Semester ${contribution.semester} ${contribution.year}`, { bold: true });
    pdfDoc.moveDown();

    pdfDoc.text(`Sehr geehrtes Vereinsmitglied!`);
    pdfDoc.text(`Gemäß der Vereinsstatuten schreiben wir für das vergangene Semester den Mitgliedsbeitrag inkl. mitgliedsbezogenen Positionen vor:`);
    pdfDoc.moveDown();

    // Beitragspositionen
    pdfDoc.text(`Positionen:`);
    // Überprüfen, ob contribution.items existiert und ob es ein Array ist
    if (Array.isArray(contribution.items) && contribution.items.length > 0) {
        contribution.items.forEach(item => {
            pdfDoc.text(`- ${item.description}: ${item.quantity} x ${item.amount} €`);
        });
    } else {
        pdfDoc.text('Keine Positionen verfügbar.');
    }
    pdfDoc.text(`Gesamtbeitrag: ${contribution.totalAmount} €`);
    pdfDoc.moveDown();
    pdfDoc.text(`Wir bitten um Überweisung auf das unten stehende Konto, binnen 14 Tagen nach Erhalt der Rechnung.`);
    pdfDoc.text(`Bei Rückfragen stehen wir euch jederzeit zur Verfügung.`);
    pdfDoc.moveDown();
    pdfDoc.text(`IBAN: ${clubInfo.iban}`);
    pdfDoc.text(`BIC: ${clubInfo.bic}`);
    pdfDoc.moveDown();
    pdfDoc.text(`Sportliche Grüße,`);
    pdfDoc.text(`${clubInfo.club_name}`);

    pdfDoc.end();

    return { filename, filePath };
};

module.exports = { createContribution, getAllContributions, getContributionById, updateContribution, deleteContribution, getClubInfo, generateContributionPDF };

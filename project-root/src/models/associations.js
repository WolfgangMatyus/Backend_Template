// associations.js
const Member = require('./members');
const Address = require('./addresses');
const ArchivedMember = require('./archivedMembers');
const Contribution = require('./contributions');
const ContributionItem = require('./contributionItems');
const User = require('./user');
const Role = require('./role');

// 1. Ein Mitglied hat viele Beiträge (One-to-Many Beziehung)
Member.hasMany(Contribution, { foreignKey: 'member_id' });
Contribution.belongsTo(Member, { foreignKey: 'member_id' });

// 2. Ein Beitrag hat viele Beitragsposten (One-to-Many Beziehung)
Contribution.hasMany(ContributionItem, { foreignKey: 'contribution_id', onDelete: 'CASCADE' });
ContributionItem.belongsTo(Contribution, { foreignKey: 'contribution_id' });

// 3. Archivierte Mitglieder Referenz auf Mitglieder (Optional)
ArchivedMember.belongsTo(Member, { foreignKey: 'original_member_id' });


// 4. Ein Mitglied gehört zu einer Adresse (belongsTo)
Member.belongsTo(Address, {
    foreignKey: 'address_id',   // Das Feld in der members Tabelle, das auf die address_id verweist
    as: 'address',              // Alias für die Beziehung (dieser wird beim Abrufen verwendet)
});

// 5. Eine Adresse kann viele Mitglieder haben (optional, falls relevant)
Address.hasMany(Member, {
    foreignKey: 'address_id',
    as: 'members'
});

// 6. Ein User kann nur eine Rolle haben (One-to-One Beziehung)
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' }); 

module.exports = {
    Member,
    Address,
    User,   
    Role,
};
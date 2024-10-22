const Member = require('./members');
const Address = require('./addresses');
const ArchivedMember = require('./archivedMembers');
const Contribution = require('./contributions');
const ContributionItem = require('./contributionItems');
const User = require('./user');
const Role = require('./role');
const JudoSpecifics = require('./judoSpecifics');  // Import des JudoSpecifics Models
const ClothingItem = require('./clothingItems');  // Importiere das ClothingItem Modell
const ItemsToContribution = require('./itemsToContribution'); // Importiere das ItemsToContribution Modell

// 1. Ein Mitglied hat viele Beiträge (One-to-Many Beziehung)
Member.hasMany(Contribution, { foreignKey: 'member_id' });
Contribution.belongsTo(Member, { foreignKey: 'member_id' });

// 3. Ein Beitrag hat viele Items in der Zwischentabelle (One-to-Many Beziehung)
Contribution.hasMany(ItemsToContribution, { foreignKey: 'contribution_id', onDelete: 'CASCADE' });
ItemsToContribution.belongsTo(Contribution, { foreignKey: 'contribution_id' });

// 4. Ein Beitragsposten kann zu mehreren Items in der Zwischentabelle gehören (One-to-Many Beziehung)
ContributionItem.hasMany(ItemsToContribution, { foreignKey: 'contribution_item_id', onDelete: 'CASCADE' });
ItemsToContribution.belongsTo(ContributionItem, { foreignKey: 'contribution_item_id' });

// 5. Ein Bekleidungsartikel kann zu mehreren Items in der Zwischentabelle gehören (One-to-Many Beziehung)
ClothingItem.hasMany(ItemsToContribution, { foreignKey: 'clothing_item_id', onDelete: 'CASCADE' });
ItemsToContribution.belongsTo(ClothingItem, { foreignKey: 'clothing_item_id' });

// 6. Archivierte Mitglieder Referenz auf Mitglieder (Optional)
ArchivedMember.belongsTo(Member, { foreignKey: 'original_member_id' });

// 7. Ein Mitglied gehört zu einer Adresse (belongsTo)
Member.belongsTo(Address, {
    foreignKey: 'address_id',   // Das Feld in der members Tabelle, das auf die address_id verweist
    as: 'addresses',              // Alias für die Beziehung (dieser wird beim Abrufen verwendet)
});

// 8. Eine Adresse kann viele Mitglieder haben (optional, falls relevant)
Address.hasMany(Member, {
    foreignKey: 'address_id',
    as: 'members'
});

// 9. Ein User kann nur eine Rolle haben (One-to-One Beziehung)
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' }); 

// 10. Ein Mitglied hat genau eine JudoSpecifics Einheit (One-to-One Beziehung)
Member.hasOne(JudoSpecifics, { foreignKey: 'member_id', onDelete: 'CASCADE', as: 'judoSpecifics' });

// 11. JudoSpecifics gehört zu einem Mitglied (One-to-One Beziehung)
JudoSpecifics.belongsTo(Member, { foreignKey: 'member_id', as: 'member' });

// Exportiere alle Modelle
module.exports = {
    Member,
    Address,
    User,
    Role,
    JudoSpecifics,
    Contribution,
    ContributionItem,
    ClothingItem,
    ItemsToContribution,
};

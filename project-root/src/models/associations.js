const Member = require('./models/member');
const ArchivedMember = require('./models/archivedMembers');
const MemberContribution = require('./models/memberContributions');
const ContributionItem = require('./models/contributionItems');

// 1. Ein Mitglied hat viele Beiträge (One-to-Many Beziehung)
Member.hasMany(MemberContribution, { foreignKey: 'member_id' });
MemberContribution.belongsTo(Member, { foreignKey: 'member_id' });

// 2. Ein Beitrag hat viele Beitragsposten (One-to-Many Beziehung)
MemberContribution.hasMany(ContributionItem, { foreignKey: 'contribution_id', onDelete: 'CASCADE' });
ContributionItem.belongsTo(MemberContribution, { foreignKey: 'contribution_id' });

// 3. Archivierte Mitglieder Referenz auf Mitglieder (Optional)
ArchivedMember.belongsTo(Member, { foreignKey: 'original_member_id' });

const User = require('./user'); 
const List = require('./list'); 
const Card = require('./card'); 
const Tag = require('./tag'); 
const CardHasTag = require('./cardHasTag'); 

// Une card possède plusieurs tags
Card.belongsToMany(Tag, {
    through: "card_has_tag",
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    as: "tags",
    timestamps: false
});

// Un tag appartient à plusieures cartes
Tag.belongsToMany(Card, {
    through: "card_has_tag",
    foreignKey: "tag_id",
    otherKey: "card_id",
    as: "cards", 
    timestamps: false
});

// Une liste appartient à un user 
List.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// Un user possède plusieures listes
User.hasMany(List, {
    foreignKey: "user_id",
    as: "lists"
});

// Une liste possède plusieures cartes
List.hasMany(Card, {
    foreignKey: "list_id",
    as: "cards"
});

// Une carte appartient à une liste
Card.belongsTo(List, {
    foreignKey: "list_id",
    as: "list"
});

module.exports = { User, List, Card, Tag, CardHasTag }; 
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("TodoList", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log('La table "TodoList" a été synchronisée avec succès.');
    })
    .catch((err) => {
        console.error('Erreur lors de la synchronisation de la table "TodoList" :', err);
    });

module.exports = User
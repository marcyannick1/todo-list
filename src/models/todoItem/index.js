const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("TodoItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    statut: {
        type: DataTypes.ENUM('a faire', 'en cours', "termine"),
        allowNull: false,
    },
});

module.exports = User
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


module.exports = User
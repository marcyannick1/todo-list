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

module.exports = User
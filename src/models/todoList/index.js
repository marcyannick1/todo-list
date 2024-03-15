const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const User =  require("../user")

const TodoList = sequelize.define("TodoList", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
});

TodoList.belongsTo(User, { foreignKey: "userId", as: "createur" });
User.hasMany(TodoList, { foreignKey: "userId" });

// (async () => {
//     await sequelize.sync({ force: true });
//   })();

module.exports = TodoList
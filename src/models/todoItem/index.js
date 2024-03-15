const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const TodoList =  require("../todoList")

const TodoItem = sequelize.define("TodoItem", {
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
    todoListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TodoList,
            key: "id",
        },
    },
});

TodoItem.belongsTo(TodoList, { foreignKey: "todoListId", as: "todolist" });
TodoList.hasMany(TodoItem, { foreignKey: "todoListId" });

// (async () => {
//     await sequelize.sync({ force: true });
//   })();

module.exports = TodoItem
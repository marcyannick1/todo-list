const todoListRoute = require("express").Router();
const todoListController = require("../../controller/todoList");
const { checkIsAuth } = require("../../utils/jwt");

module.exports = (app) => {
    todoListRoute.post("/todolist", checkIsAuth, todoListController.create);
    todoListRoute.put("/todolist/:id", checkIsAuth, todoListController.update);
    todoListRoute.delete("/todolist/:id", checkIsAuth, todoListController.delete);
    app.use("/api/v1", todoListRoute);
};

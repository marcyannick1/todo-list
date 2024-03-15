const todoItemRoute = require("express").Router();
const todoItemController = require("../../controller/todoItem");
const { checkIsAuth } = require("../../utils/jwt");


module.exports = (app) => {
    todoItemRoute.post("/todolist", checkIsAuth,todoItemController.create);
    todoItemRoute.put("/todolist/:id", checkIsAuth,todoItemController.update);
    todoItemRoute.delete("/todolist/:id", checkIsAuth,todoItemController.delete);
    app.use("/api/v1", todoItemRoute);
};

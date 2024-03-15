const TodoList = require("../../models/todoList");

exports.create = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });
    const { nom, userId } = req.body;

    try {
        const todolist = await TodoList.create({ nom, userId });

        res.status(201).json({ todolist });
    } catch (error) {
        console.error("err:", error);
        res.status(500).json({ message: "Erreur lors de la creation" });
    }
};

exports.update = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });

    const { nom } = req.body;
    const { id } = req.params;
    try {
        const todolist = await TodoList.update(
            {
                nom,
            },
            { where: { id: id } }
        );
        return res.status(200).json({ msg: "Ok" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ msg: "BAD REQUEST" + e.message });
    }
};
exports.delete = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
    const { id } = req.params;
    try {
        const todolist = await TodoList.destroy({ where: { id: id } });
        console.log(todolist);
        if (!todolist) {
            res.status(400).json({ msg: "BAD REQUEST" });
        }
        return res.status(200).json({ msg: "OK" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ msg: "BAD REQUEST" + e.message });
    }
};



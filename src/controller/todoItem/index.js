const TodoItem = require("../../models/todoItem");

exports.create = async (req, res) => {
    const { nom, description, todoListId } = req.body;

    try {
        const todoitem = await TodoItem.create({ nom, description, statut: "a faire", todoListId });

        res.status(201).json({ todoitem });
    } catch (error) {
        console.error("err:", error);
        res.status(500).json({ message: "Erreur lors de la creation" });
    }
};

exports.update = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: "BAD REQUEST PARAMS IS REQUIRED" });
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });

    const { nom, description } = req.body;
    const { id } = req.params;
    try {
        const todoitem = await TodoItem.update(
            {
                nom,
                description,
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
        const todoitem = await TodoItem.destroy({ where: { id: id } });
        if (!todoitem) {
            res.status(400).json({ msg: "BAD REQUEST" });
        }
        return res.status(200).json({ msg: "OK" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ msg: "BAD REQUEST" + e.message });
    }
};

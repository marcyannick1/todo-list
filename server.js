const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { hashPassword, checkPassword } = require("./src/utils/bcrypt");
const User = require("./src/models/user");
const TodoList = require("./src/models/todoList");
const TodoItem = require("./src/models/todoItem");
const bodyParser = require("body-parser");
const { jwtSign, checkIsAuth } = require("./src/utils/jwt");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

app.get("/", (req, res) => {
    res.send("Bienvenue sur le serveur");
});

// auth
app.post("/register", async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });
    const { nom, prenom, email, pseudo, password } = req.body;

    const hashedPassword = hashPassword(password);
    try {
        const user = await User.create({ nom, prenom, email, pseudo, password: hashedPassword });

        res.status(201).json({ user });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
});

app.post("/login", async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !checkPassword(password, user.password)) {
            res.status(401).send({ error: "Email ou mot de passe incorrect" });
        }

        const token = await jwtSign({ id: user.id });
        await User.update({ token }, { where: { id: user.id } });

        res.status(200).json({ message: "Connexion réussie" });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: "Erreur lors de la connexion" });
    }
});

// todolist
app.post("/todolist", checkIsAuth, async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: "BAD REQUEST BODY IS REQUIRED" });
    const { nom, userId } = req.body;

    try {
        const todolist = await TodoList.create({ nom, userId });

        res.status(201).json({ todolist });
    } catch (error) {
        console.error("err:", error);
        res.status(500).json({ message: "Erreur lors de la creation" });
    }
});

app.put("/todolist/:id", checkIsAuth, async (req, res) => {
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
});

app.delete("/todolist/:id", checkIsAuth, async (req, res) => {
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
});

// todoitem
app.post("/todoitem", checkIsAuth, async (req, res) => {
    const { nom, description, todoListId } = req.body;

    try {
        const todoitem = await TodoItem.create({ nom, description, statut: "a faire", todoListId });

        res.status(201).json({ todoitem });
    } catch (error) {
        console.error("err:", error);
        res.status(500).json({ message: "Erreur lors de la creation" });
    }
});

app.put("/todoitem/:id", checkIsAuth, async (req, res) => {
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
});

app.delete("/todoitem/:id", checkIsAuth, async (req, res) => {
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
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Serveur démarré sur http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { hashPassword, checkPassword } = require("./src/utils/bcrypt");
const User = require("./src/models/user");
const bodyParser = require("body-parser");
const { jwtSign } = require("./src/utils/jwt");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
    res.send("Bienvenue sur le serveur");
});

app.post("/register", async (req, res) => {
    const { nom, prenom, email, pseudo, password } = req.body;

    const hashedPassword = await hashPassword(password);
    try {
        const user = await User.create({ nom, prenom, email, pseudo, password: hashedPassword });

        const token = await jwtSign({ id: user.id });
        await User.update({ token }, { where: { id: user.id } });

        res.status(201).json({ user });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
});

app.post("/login", async (req, res) => {
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

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(port, async () => {
    console.log(`Serveur démarré sur http://${host}:${port}`);
});

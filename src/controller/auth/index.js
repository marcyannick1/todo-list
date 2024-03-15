const { hashPassword, checkPassword } = require("../../utils/bcrypt");
const User = require("../../models/user");
const { jwtSign } = require("../../utils/jwt");

exports.login = async (req, res) => {
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
};

exports.register = async (req, res) => {
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
};

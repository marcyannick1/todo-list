const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
        method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    })
);

app.use(express.urlencoded({extended: true}))
app.use(express.json())

require('./src/routes')(app)

app.get("/", (req, res) => {
    res.send("Bienvenue sur le serveur");
});

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.SERVER_PORT, async () => {
    console.log(`Serveur démarré sur http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});

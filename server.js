const express =  require('express');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;


app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur');
});

app.use((req, res)=>{
    res.status(404).send("Not Found");
})

app.listen(port, async () => {
    console.log(`Serveur démarré sur http://${host}:${port}`);
});
const express =  require('express');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const port = process.env.SERVER_PORT;


app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur');
});

app.use((req, res)=>{
    res.status(404).send("Not Found");
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
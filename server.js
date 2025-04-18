require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");
const app = express();
const db = new Database("db/database.sqlite");

app.use(cors());
app.use(express.json());

const ingredientRoutes = require("./routes/ingredientRoutes");
const pelucheRoutes = require("./routes/peluche");

app.use("/ingredients", ingredientRoutes);
app.use("/peluches", pelucheRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

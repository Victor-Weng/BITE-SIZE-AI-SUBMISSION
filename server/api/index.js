require('dotenv').config();
const express = require("express"); // Get the library
const app = express(); // make the app run express
const cors = require("cors"); // lets front end make requests to back end
const pool = require("../db"); // require the db.js file from parent folder

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// Post a new bite
app.post(`/bites`, async (req, res) => {
    try {
        const { address } = req.body;
        const newAddress = await pool.query(
            "INSERT INTO bite (address) VALUES($1) RETURNING *",
            [address]
        );
        res.json(newAddress.rows[0]);
    } catch (err) {
        console.error("Error inserting bite:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get the latest bite
app.get(`/bites/latest`, async (req, res) => {
    try {
        const latestBite = await pool.query(
            "SELECT * FROM bite ORDER BY bite_id DESC LIMIT 1"
        );
        res.json(latestBite.rows[0]);
    } catch (err) {
        console.error("Error fetching latest bite:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// Start the server

app.listen(() => {
    console.log("Server has started.");
});
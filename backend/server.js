require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI) 
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Simple Route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

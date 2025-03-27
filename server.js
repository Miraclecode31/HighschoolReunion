const express = require('express');
const app = express();

const PORT = 3000;

// Simple Route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const PORT = 3000;
app.get('/welcome', (req, res) => {
    res.json({
        message: "Welcome to API"
    });
});
app.get('/greet', (req, res) => {
    const name = req.query.name || "Guest";
    res.json({
        message: `Hello ${name}`
    });
});
app.get('/student/:name', (req, res) => {
    const studentName = req.params.name;
    res.json({
        student: studentName,
        status: "Record fetched successfully"
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

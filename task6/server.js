const express = require('express');
const APP = express();
const port = 3000;
APP.get('/welcome', (req, res) => {
    res.json({
        message: "Welcome to  api"
    });
});
APP.get('/greet', (req, res) => {
    const name = req.query.name || "Guest";
    res.json({
        message: `Hello ${name}`
    });
});
APP.get('/student/:name', (req, res) => {
    const studentName = req.params.name;
    res.json({
        student: studentName,
        status: "Record fetched successfully"
    });
});
APPp.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});

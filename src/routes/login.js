// routes/login.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views/login.html');
    res.sendFile(filePath);
});

  module.exports = router;
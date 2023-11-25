const express = require('express');
const router = express.Router();

const ku_listController = require('../controllers/KU_listController');

router.get('/', ku_listController.ReportPageOpen);

module.exports = router;
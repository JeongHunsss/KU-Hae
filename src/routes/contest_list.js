const express = require('express');
const router = express.Router();

const contestController = require('../controllers/ContestController');

router.get('/', contestController.PageOpen);

  module.exports = router;
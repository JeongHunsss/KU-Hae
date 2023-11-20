const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contest_list');
});

router.get('/detail', (req, res) => {
  res.render('contest_detail');
});

  module.exports = router;
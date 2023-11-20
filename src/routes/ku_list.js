const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('ku_list');
});

router.get('/add', (req, res) => {
  res.render('ku_add');
});

router.get('/detail', (req, res) => {
  res.render('ku_detail');
});

  module.exports = router;
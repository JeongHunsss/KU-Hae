const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('notice_list');
});

router.get('/add', (req, res) => {
  res.render('notice_add');
});

router.get('/detail', (req, res) => {
  res.render('notice_detail');
});

  module.exports = router;
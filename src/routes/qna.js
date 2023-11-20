const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('qna');
});

router.get('/add', (req, res) => {
  res.render('qna_add');
});

router.get('/detail', (req, res) => {
  res.render('qna_detail');
});

  module.exports = router;
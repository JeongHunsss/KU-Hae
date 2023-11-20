const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('qna', {user});
});

router.get('/add', (req, res) => {
  const user = req.session.user;
  res.render('qna_add', {user});
});

router.get('/detail', (req, res) => {
  const user = req.session.user;
  res.render('qna_detail', {user});
});

  module.exports = router;
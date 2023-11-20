const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('notice_list', {user});
});

router.get('/add', (req, res) => {
  const user = req.session.user;
  res.render('notice_add', {user});
});

router.get('/detail', (req, res) => {
  const user = req.session.user;
  res.render('notice_detail', {user});
});

  module.exports = router;
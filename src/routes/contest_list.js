const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contest_list', {user: req.session.user});
});

router.get('/detail', (req, res) => {
  res.render('contest_detail', {user: req.session.user});
});

  module.exports = router;
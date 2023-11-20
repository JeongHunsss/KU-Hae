const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('contest_list', {user});
});

router.get('/detail', (req, res) => {
  const user = req.session.user;
  res.render('contest_detail', {user});
});

  module.exports = router;
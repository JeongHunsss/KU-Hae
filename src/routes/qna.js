const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('qna', {user: req.session.user, rooms: req.session.rooms});
});

router.get('/add', (req, res) => {
  res.render('qna_add', {user: req.session.user, rooms: req.session.rooms});
});

router.get('/detail', (req, res) => {
  res.render('qna_detail', {user: req.session.user, rooms: req.session.rooms});
});

  module.exports = router;
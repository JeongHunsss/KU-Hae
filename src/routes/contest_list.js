const express = require('express');
const router = express.Router();

const contestController = require('../controllers/ContestController');

router.get('/', contestController.PageOpen);

router.get('/detail', (req, res) => {
  res.render('contest_detail', {user: req.session.user, rooms: req.session.rooms});
});

  module.exports = router;
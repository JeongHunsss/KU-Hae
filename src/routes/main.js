const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {user: req.session.user, rooms: req.session.rooms});
});

  module.exports = router;
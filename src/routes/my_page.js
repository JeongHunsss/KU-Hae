const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('my_page', {user: req.session.user});
});

  module.exports = router;
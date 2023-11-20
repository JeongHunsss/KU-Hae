const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('my_page', {user});
});

  module.exports = router;
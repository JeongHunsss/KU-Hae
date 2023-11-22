const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('report_list', {user: req.session.user});
});

  module.exports = router;
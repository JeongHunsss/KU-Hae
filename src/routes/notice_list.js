const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('notice_list');
});

  module.exports = router;
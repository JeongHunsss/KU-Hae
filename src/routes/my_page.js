const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('my_page');
});

  module.exports = router;
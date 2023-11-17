const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('ku_list');
});

  module.exports = router;
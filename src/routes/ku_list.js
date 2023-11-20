const express = require('express');
const router = express.Router();

const ku_listController = require('../controllers/KU_listController');

router.get('/', ku_listController.PageOpen);

router.get('/add', (req, res) => {
  const user = req.session.user;
  res.render('ku_add', {user});
});

router.get('/detail', (req, res) => {
  const user = req.session.user;
  res.render('ku_detail', {user});
});

  module.exports = router;
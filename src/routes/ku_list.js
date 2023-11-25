const express = require('express');
const router = express.Router();

const ku_listController = require('../controllers/KU_listController');

router.get('/', ku_listController.PageOpen);

router.get('/add', (req, res) => {
  res.render('ku_add', {user: req.session.user});
});
router.get('/edit', ku_listController.EditListPage);

router.post('/report', ku_listController.ReportList);
router.post('/add', ku_listController.AddList);
router.post('/edit', ku_listController.EditList);
router.post('/delete', ku_listController.DeleteList);

  module.exports = router;
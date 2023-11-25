const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/NoticeController');

router.get('/', noticeController.PageOpen);
router.get('/add', (req, res) => {
  res.render('notice_add', {user: req.session.user, rooms: req.session.rooms});
});
router.get('/edit', noticeController.EditNoticePage);
router.get('/detail', noticeController.ViewDetail);

router.post('/add', noticeController.AddNotice);
router.post('/edit', noticeController.EditNotice);
router.post('/delete', noticeController.DeleteNotice);

  module.exports = router;
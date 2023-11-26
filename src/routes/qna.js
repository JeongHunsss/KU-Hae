const express = require('express');
const router = express.Router();

const qnaController = require('../controllers/QnAController');

router.get('/', qnaController.PageOpen);

router.get('/add', (req, res) => {
  res.render('qna_add', {user: req.session.user, rooms: req.session.rooms});
});

router.get('/detail', qnaController.ViewDetail);

router.post('/addqestion', qnaController.AddQestion);
router.post('/deletequestion', qnaController.DeleteQuestion);

router.post('/addanswer', qnaController.AddAnswer);
router.post('/editanswer', qnaController.EditAnswer);
router.post('/deleteanswer', qnaController.DeleteAnswer);

  module.exports = router;
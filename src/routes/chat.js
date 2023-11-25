const express = require('express');
const router = express.Router();

const chatController = require('../controllers/ChatController');

router.get('/', (req, res) => {
  res.render('chat_page');
});

router.post('/createrequest', chatController.createRequest);
router.post('/acceptrequest', chatController.acceptRequest);
router.post('/rejectrequest', chatController.rejectRequest);

module.exports = router;
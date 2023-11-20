const loginController = require('../controllers/LoginController');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

// 로그인 처리
router.post('/', loginController.login);

// 로그아웃
router.get('/logout', loginController.logout);

module.exports = router;
const userController = require('../controllers/UserController');

const express = require('express');
const router = express.Router();

// 회원가입 페이지 보기
router.get('/', (req, res) => {
  res.render('signup');
});

// 회원가입 처리
router.post('/', userController.createUser);

// 아이디 중복확인
router.post('/checkdup', userController.checkDuplicateUsername)


module.exports = router;
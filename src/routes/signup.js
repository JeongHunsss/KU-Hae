const userController = require('../controllers/UserController');
const emailController = require('../controllers/EmailController');

const express = require('express');
const router = express.Router();

// 회원가입 페이지 보기
router.get('/', (req, res) => {
  res.render('signup');
});

// 회원가입 처리
router.post('/', userController.createUser);

// 아이디 중복확인
router.post('/checkdup', userController.checkDuplicateUsername);

// 이메일 인증
router.post('/checkemail', emailController.sendVerificationEmail);

// 인증코드 확인
router.post('/checkcode', emailController.verifyCode);


module.exports = router;
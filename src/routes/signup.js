const express = require('express');
const router = express.Router();

// 회원가입 페이지 보기
router.get('/', (req, res) => {
  res.render('signup');
});


module.exports = router;
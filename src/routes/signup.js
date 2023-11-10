const express = require('express');
const router = express.Router();
const path = require('path');

// 회원가입 페이지 보기
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../views/signup.html');
  res.sendFile(filePath);
});



module.exports = router;
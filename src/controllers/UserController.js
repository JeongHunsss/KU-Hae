const User = require('../models/User');

// 유저 생성
exports.createUser = (req, res) => {
  const userData = {
    user_id: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  const user = new User();

  user.createUser(userData, (err, result) => {
    if (err) {
      console.error('회원가입 오류:', err);
      res.send('회원가입 실패');
    } else {
      res.send('회원가입 성공');
    }
  });
};

// 모든 유저 정보 가져오기
exports.getAllUsers = (req, res) => {
  const user = new User();

  user.getAllUsers((err, results) => {
    if (err) {
      console.error('유저 정보 가져오기 오류:', err);
      res.status(500).json({ error: '유저 정보 가져오기 실패' });
    } else {
      res.status(200).json(results);
    }
  });
};

// 특정 유저 가져오기
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const user = new User();

  user.getUserById(userId, (err, result) => {
    if (err) {
      console.error('특정 유저 정보 가져오기 오류:', err);
      res.status(500).json({ error: '특정 유저 정보 가져오기 실패' });
    } else if (result.length === 0) {
      res.status(404).json({ error: '유저를 찾을 수 없습니다' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// 유저 정보 업데이트
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedData = {
    user_id: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  const user = new User();

  user.updateUser(userId, updatedData, (err, result) => {
    if (err) {
      console.error('유저 정보 업데이트 오류:', err);
      res.send('유저 정보 업데이트 실패');
    } else {
      res.send('유저 정보 업데이트 성공');
    }
  });
};

// 유저 삭제
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const user = new User();

  user.deleteUser(userId, (err, result) => {
    if (err) {
      console.error('유저 삭제 오류:', err);
      res.send('유저 삭제 실패');
    } else {
      res.send('유저 삭제 성공');
    }
  });
};
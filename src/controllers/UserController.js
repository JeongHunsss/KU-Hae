const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 솔트를 생성하는 데 사용되는 라운드 수

// 회원가입
exports.createUser = (req, res) => {
  // 유효성 검사
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.render('signup', { message: '모든 필수 입력 항목을 채워주세요.' });
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  if (req.body.password !== req.body['password-confirm']) {
    return res.render('signup', { message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
  }

  // bcrypt를 사용하여 비밀번호 해시 생성
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.error('비밀번호 해시 생성 오류:', err);
      return res.render('signup', { message: '회원가입 실패', details: err.message });
    }

    const userData = {
      user_id: req.body.username,
      password: hash, // 해시된 비밀번호 저장
      email: req.body.email
    };

    const user = new User();

    user.createUser(userData, (err, result) => {
      if (err) {
        console.error('회원가입 오류:', err);
        return res.render('signup', { message: '회원가입 실패', details: err.message });
      } else {
        return res.render('signup', { message: '회원가입 성공' });
      }
    });
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

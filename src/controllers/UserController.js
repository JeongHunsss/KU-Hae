const User = require('../models/User');
const Passion_log = require('../models/Passion_log')
const bcrypt = require('bcrypt');
const saltRounds = 10; // 솔트를 생성하는 데 사용되는 라운드 수

// 회원가입
exports.createUser = (req, res) => {
  // 유효성 검사
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(200).json({ message: '모든 필수 입력 항목을 채워주세요.' });
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  if (req.body.password !== req.body.password_confirm) {
    return res.status(200).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
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
        return res.status(500).json({ message: '회원가입 실패', details: err.message });
      } else {
        return res.status(200).json({ message: '회원가입 성공', isOK: true });
      }
    });
  });
};

exports.checkDuplicateUsername = (req, res) => {
  const username = req.body.username;

  const user = new User();
  user.getUserById(username, (err, result) => {
    if (err) {
      console.error('아이디 중복 확인 오류:', err);
      res.status(500).json({ error: '아이디 중복 확인 오류' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ isDuplicate: false, DupMessage: '이미 사용 중인 아이디입니다.' });
      } else {
        res.status(200).json({ isDuplicate: true, DupMessage: '사용 가능한 아이디입니다.' });
      }
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

// 열정도 증가
exports.UpPassion = (req, res) => {
  const user = new User();
  const passion_log = new Passion_log();
  
  const passionData = {
    sender: req.body.sender,
    receiver: req.body.receiver
  };

  passion_log.getLogById(passionData.sender, passionData.receiver, (err, passionLog) => {
    if (err) {
      console.error('로그 가져오기 오류:', err);
      res.status(500).json({ error: '로그 가져오기 실패' });
    } else {
      if (passionLog.length > 0) {
        res.status(200).json({ message: '이미 올린 유저입니다.' });
      } else {
        // 로그가 없으면 로그를 생성 후 열정도를 증가시킴
        passion_log.createLog(passionData);
        user.increasePassionScore(passionData.receiver, (increaseErr) => {
          if (increaseErr) {
            console.error('신고 수 증가 오류:', increaseErr);
            res.status(500).json({ error: '열정도 증가 실패' });
          } else {
            res.status(200).json({ message: '증가 완료' });
          }
        });
      }
    }
  });
};

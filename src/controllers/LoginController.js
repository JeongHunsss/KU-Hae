const User = require('../models/User');

// 로그인
exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = new User();

  user.loginUser(username, password, (err, user) => {
    if (err) {
      console.error('로그인 오류:', err);
      res.status(500).send('로그인 실패');
    } else if (user) {
      req.session.user = user.user_id;
      console.log("(로그인)session: " + req.session.user);
      res.redirect('/main'); // 로그인 성공 시 홈페이지로 리다이렉트
    } else {
      res.render('login', { message: '아이디 또는 비밀번호가 틀립니다.' });
    }
  });
};

// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 오류:', err);
      res.status(500).send('로그아웃 실패');
    } else {
      console.log("(로그아웃)session: " + req.session);
      res.redirect('/main'); // 로그아웃 후 메인 페이지로 리다이렉트
    }
  });
};

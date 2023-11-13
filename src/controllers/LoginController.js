const User = require('../models/User');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = new User();

  user.loginUser(username, password, (err, user) => {
    if (err) {
      console.error('로그인 오류:', err);
      res.status(500).send('로그인 실패');
    } else if (user) {
      req.session.user = user.user_id;
      console.log("user: " + user);
      console.log("session: " + req.session.user);
      res.redirect('/main'); // 로그인 성공 시 홈페이지로 리다이렉트
    } else {
      res.render('login', { message: '아이디 또는 비밀번호가 틀립니다.' }); // 로그인 실패 시 반환
    }
  });
};

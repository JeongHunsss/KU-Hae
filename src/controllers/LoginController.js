const User = require('../models/User');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = new User();
  // User 모델을 사용하여 데이터베이스 쿼리를 수행

  user.loginUser(username, password, (err, user) => {
    if (err) {
      console.error('로그인 오류:', err);
      res.send('로그인 실패');
    } else if (user) {
      // 사용자가 인증되면 세션에 사용자 정보 저장
      req.session.user = user.user_id;
      console.log("user: " + user);
      console.log("session: " + req.session.user);
      res.send('로그인 성공');
    } else {
      res.send('로그인 실패');
    }
  });
};

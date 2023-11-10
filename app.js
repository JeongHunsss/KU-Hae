const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const signupRouter = require(__dirname + '/src/routes/signup');
const userController = require(__dirname + '/src/controllers/UserController');
const loginRouter = require(__dirname + '/src/routes/login');
const loginController = require(__dirname + '/src/controllers/LoginController');
const config = require(__dirname + '/config/SessionConfig');

const app = express();


// 라우터 등록
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// 세션 미들웨어 설정
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 처리
app.post('/signup', userController.createUser);
// 로그인 처리
app.post('/login', loginController.login);


// 웹 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중`);
});
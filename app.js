const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const signupRouter = require(__dirname + '/src/routes/signup');
const loginRouter = require(__dirname + '/src/routes/login');
const mainRouter = require(__dirname + '/src/routes/main');
const userController = require(__dirname + '/src/controllers/UserController');
const loginController = require(__dirname + '/src/controllers/LoginController');
const config = require(__dirname + '/config/SessionConfig');

const app = express();

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs'); // EJS 설정 추가
app.set('views', __dirname + '/src/views'); // views 디렉토리 설정

// 세션 미들웨어 설정
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json()); // JSON 파싱을 위한 설정
app.use(bodyParser.urlencoded({ extended: true }));


// 라우터 등록
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);

// 회원가입 처리
app.post('/signup', userController.createUser);
// 로그인 처리
app.post('/login', loginController.login);

// 첫 화면 설정
app.use('/', (req, res, next) => {
  res.redirect('/main');
});


// 웹 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중`);
});
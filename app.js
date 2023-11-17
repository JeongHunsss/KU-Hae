const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const signupRouter = require(__dirname + '/src/routes/signup');
const loginRouter = require(__dirname + '/src/routes/login');
const mainRouter = require(__dirname + '/src/routes/main');
const ku_listRouter = require(__dirname + '/src/routes/ku_list');
const notice_listRouter = require(__dirname + '/src/routes/notice_list');
const chat_pageRouter = require(__dirname + '/src/routes/chat_page');
const my_pageRouter = require(__dirname + '/src/routes/my_page');
const post_listRouter = require(__dirname + '/src/routes/post_list');
const report_listRouter = require(__dirname + '/src/routes/report_list');
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
app.use('/ku_list', ku_listRouter);
app.use('/notice_list', notice_listRouter);
app.use('/chat_page', chat_pageRouter);
app.use('/my_page', my_pageRouter);
app.use('/post_list', post_listRouter);
app.use('/report_list', report_listRouter);





// 웹 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중`);
});
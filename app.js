const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');

const signupRouter = require(__dirname + '/src/routes/signup');
const loginRouter = require(__dirname + '/src/routes/login');
const mainRouter = require(__dirname + '/src/routes/main');
const ku_listRouter = require(__dirname + '/src/routes/ku_list');
const notice_listRouter = require(__dirname + '/src/routes/notice_list');
const chatRouter = require(__dirname + '/src/routes/chat');
const my_pageRouter = require(__dirname + '/src/routes/my_page');
const contest_listRouter = require(__dirname + '/src/routes/contest_list');
const report_listRouter = require(__dirname + '/src/routes/report_list');
const qnaRouter = require(__dirname + '/src/routes/qna');

const config = require(__dirname + '/config/SessionConfig');

const chatController = require('./src/controllers/ChatController');

const crawler = require(__dirname + '/static/js/crawler');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// 세션 미들웨어 설정
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json()); // JSON 파싱을 위한 설정
app.use(bodyParser.urlencoded({ extended: true }));

// Express 애플리케이션을 Socket.io 서버와 연결
chatController.initSocket(server);

// 라우터 등록
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);
app.use('/ku_list', ku_listRouter);
app.use('/notice_list', notice_listRouter);
app.use('/chat', chatRouter);
app.use('/my_page', my_pageRouter);
app.use('/contest_list', contest_listRouter);
app.use('/report_list', report_listRouter);
app.use('/qna', qnaRouter);


// '/' 요청 시 '/main'으로 첫 화면 설정
app.get('/', (req, res) => {
  res.redirect('/main');
});


// 서버 시작전에 공모전 크롤링 (서버에 무리를 주지 않기 위해 1번 1페이지만)
crawler.crawling();

// 서버 시작
const port = 3000;
server.listen(port, () => console.log(`app listening on port ${port}!`));
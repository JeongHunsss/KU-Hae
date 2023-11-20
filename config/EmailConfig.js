const nodemailer = require('nodemailer');


// 네이버 SMTP 설정
const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true, 
    auth: {
      user: '(네이버 이메일 아이디(@naver.com 미포함))', // 네이버 이메일 계정
      pass: '(네이버 애플리케이션 비밀번호)' // 네이버 이메일 비밀번호
    }
});

const mailOptions = {
    from: 'KU-HAE (네이버 이메일 아이디(@naver.com 포함))',
    to: '',
    subject: 'KU-HAE 이메일 인증입니다.',
    text: ''
  };

module.exports = { mailOptions, transporter };
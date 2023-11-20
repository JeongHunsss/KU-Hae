const emailConfig = require('../../config/EmailConfig');

// 이메일에 대한 인증 코드
var verificationCodes = {}; // 사용자 이메일: 인증 코드

// 인증 코드 랜덤 생성
function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000); // 100,000부터 999,999 사이의 랜덤 숫자 생성
}

const transporter = emailConfig.transporter;
const mailOptions = emailConfig.mailOptions;

// 이메일 인증 코드 전송
exports.sendVerificationEmail = (req, res) => {
    const userEmail = req.body.email;
    const verificationNumber = generateRandomNumber();

    verificationCodes[userEmail] = []; // userEmail에 대한 배열 빈 배열로 초기화
    verificationCodes[userEmail].push(verificationNumber); // 이메일에 대한 인증코드 저장

    console.log("-----인증코드-----");
    console.log(verificationCodes);
    console.log("-----------------");
  
    mailOptions.to = userEmail + '@kku.ac.kr'; // 수신 이메일 주소
    mailOptions.text = `KU-HAE 이메일 인증을 하기 위해선 다음 코드를 입력해주세요: ${verificationNumber}`;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ isEmailSend : false, EmailMessage: '이메일 전송 실패' });
        } else {
            console.log('이메일 전송: ' + info.response);
            res.status(200).json({ isEmailSend : true, EmailMessage: '이메일 전송 성공' });
        }
    });
}

exports.verifyCode = (req, res) => {
    const { email, enteredCode } = req.body; // 사용자가 입력한 이메일과 코드
    const storedCode = verificationCodes[email]; // 저장된 코드

    if (!storedCode) {  //저장된 값이 없음 (에러)
        res.status(404).json({ message: '인증 코드를 찾을 수 없습니다.' });
    }else if (storedCode == enteredCode) {  // 일치
        // 코드를 확인한 후, 해당 코드는 삭제
        delete verificationCodes[email];
        res.status(200).json({ isEmailCheck: true, EmailMessage: '이메일 인증에 성공했습니다!' });
    }else if (storedCode !== enteredCode) { // 불일치
        res.status(200).json({ isEmailCheck: false, EmailMessage: '인증 코드가 일치하지 않습니다.' });
    }
};
const mysql = require('mysql2');

// MySQL 연결 정보
const connection = mysql.createConnection({
  host: 'localhost',      // 데이터베이스 호스트
  user: 'username',           // 데이터베이스 사용자 이름
  password: 'password',   // 데이터베이스 사용자 암호
  database: 'KU-Hae'  // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('디비 연동 에러:', err);
  } else {
    console.log('디비 연동 완료');
  }
});

module.exports = connection;

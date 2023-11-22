const connection = require('../../config/DBconfig');

class Passion_log {
    // 로그 생성
  createLog(passionLogData, callback) {
    const query = 'INSERT INTO passion_log SET ?';
    connection.query(query, passionLogData, callback);
  }

    // 특정 로그 가져오기
  getLogById(sender, receiver, callback) {
    const query = 'SELECT * FROM passion_log WHERE sender = ? AND receiver = ?';
    connection.query(query, [sender, receiver], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Passion_log;
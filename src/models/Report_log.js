const connection = require('../../config/DBconfig');

class Report_log {
    // 로그 생성
  createLog(reportLogData, callback) {
    const query = 'INSERT INTO report_log SET ?';
    connection.query(query, reportLogData, callback);
  }

    // 특정 로그 가져오기
  getLogById(userId, postId, callback) {
    const query = 'SELECT * FROM report_log WHERE user_id = ? AND post_id = ?';
    connection.query(query, [userId, postId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Report_log;
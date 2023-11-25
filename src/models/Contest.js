const connection = require('../../config/DBconfig');

class Contest {
    // 공모전 리스트 생성
  createContest(contestData, callback) {
    const query = 'INSERT INTO contest SET ?';
    connection.query(query, contestData, callback);
  }

  // 공모전 가져오기
  getAllContest(callback) {
    const query = 'SELECT * FROM contest';
    connection.query(query, callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Contest;
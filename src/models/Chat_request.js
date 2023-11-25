const connection = require('../../config/DBconfig');

class Chat_request {
    // 요청 생성
  createRequest(requestData, callback) {
    const query = 'INSERT INTO chat_request SET ?';
    connection.query(query, requestData, callback);
  }

  // 요청 제거
  deleteRequest(request_id, callback) {
    const query = 'DELETE FROM chat_request WHERE id = ?';
    connection.query(query, request_id, callback);
  }

  // 특정 유저의 요청 가져오기
  getRequestById(userId, callback) {
    const query = 'SELECT * FROM chat_request WHERE receiver = ?';
    connection.query(query, [userId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Chat_request;
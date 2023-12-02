const connection = require('../../config/DBconfig');

class Chat_messages {
    // 채팅 생성
  createMessages(Data, callback) {
    const query = 'INSERT INTO chat_messages SET ?';
    connection.query(query, Data, callback);
  }

  // 채팅 제거
  deleteMessages(room_id, callback) {
    const query = 'DELETE FROM chat_messages WHERE room_id = ?';
    connection.query(query, room_id, callback);
  }

  // 특정 방의 채팅 가져오기
  getMessagesByroomId(roomId, callback) {
    const query = 'SELECT * FROM chat_messages WHERE room_id = ?';
    connection.query(query, [roomId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Chat_messages;
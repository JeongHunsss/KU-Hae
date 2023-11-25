const connection = require('../../config/DBconfig');

class Chat_rooms {
    // 채팅방 생성
  createRoom(roomData, callback) {
    const query = 'INSERT INTO chat_rooms SET ?';
    connection.query(query, requestData, callback);
  }

  // 채팅방 제거
  deleteRoom(room_id, callback) {
    const query = 'DELETE FROM chat_rooms WHERE room_id = ?';
    connection.query(query, room_id, callback);
  }

  // 특정 유저의 채팅방 가져오기
  getRoomByuserId(userId, callback) {
    const query = 'SELECT * FROM chat_rooms WHERE receiver = ? OR sender = ?';
    connection.query(query, [userId, userId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Chat_rooms;
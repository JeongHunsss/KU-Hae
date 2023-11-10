const connection = require('../../config/DBconfig'); // DB 연결 정보

class User {
    // 유저 생성
  createUser(userData, callback) {
    const query = 'INSERT INTO users SET ?';
    connection.query(query, userData, callback);
  }

    // 모든 유저 정보 가져오기
  getAllUsers(callback) {
    const query = 'SELECT * FROM users';
    connection.query(query, callback);
  }

    // 특정 유저 가져오기
  getUserById(userId, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [userId], callback);
  }

  // 업데이트
  updateUser(userId, updatedData, callback) {
    const query = 'UPDATE users SET ? WHERE id = ?';
    connection.query(query, [updatedData, userId], callback);
  }

  // 삭제
  deleteUser(userId, callback) {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [userId], callback);
  }

  // 로그인 인증
  loginUser(userId, password, callback) {
    const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';
    connection.query(query,[userId, password], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = User;
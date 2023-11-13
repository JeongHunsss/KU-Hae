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
    connection.query(query, [userId, password], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // 사용자가 존재하고 비밀번호가 일치하는 경우
        if (results.length > 0) {
            const user = results[0];
            return callback(null, user);
        } else {
            // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우
            return callback(null, null);
        }
    });
}

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = User;
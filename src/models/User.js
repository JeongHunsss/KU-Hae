const connection = require('../../config/DBconfig'); // DB 연결 정보
const bcrypt = require('bcrypt');

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
    const query = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // 사용자가 존재하는 경우
        if (results.length > 0) {
            const storedHashedPassword = results[0].password;

            // 입력된 비밀번호를 해싱하여 저장된 해시 값과 비교
            bcrypt.compare(password, storedHashedPassword, (compareErr, result) => {
                if (compareErr) {
                    return callback(compareErr, null);
                }

                if (result) {
                    const user = results[0];
                    return callback(null, user);
                } else {
                    // 비밀번호 불일치
                    return callback(null, null);
                }
            });
        } else {
            // 사용자가 존재하지 않는 경우
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
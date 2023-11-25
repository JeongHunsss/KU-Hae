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

  //페이지네이션 (전체)
  getContestPerPage(perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM contest ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [offset, perPage], callback);
  }

  //페이지네이션 (검색)
  getContestByTitlePerPage(searchTitle, perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM contest WHERE title LIKE ? ORDER BY id DESC LIMIT ?, ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm, offset, perPage], callback);
  }

  // 특정 공모전 가져오기
  getContestByTitle(searchTitle, callback) {
    const query = 'SELECT * FROM contest WHERE title LIKE ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Contest;
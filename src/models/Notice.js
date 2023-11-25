const connection = require('../../config/DBconfig');

class Notice {
    // 글 생성
  createNotice(noticeData, callback) {
    const query = 'INSERT INTO notice SET ?';
    connection.query(query, noticeData, callback);
  }

  //페이지네이션 (전체)
  getNoticePerPage(perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM notice ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [offset, perPage], callback);
  }

  //페이지네이션 (검색)
  getNoticeByTitlePerPage(searchTitle, perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM notice WHERE title LIKE ? ORDER BY id DESC LIMIT ?, ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm, offset, perPage], callback);
  }

  // 모든 글 정보 가져오기
  getAllNotice(callback) {
    const query = 'SELECT * FROM notice';
    connection.query(query, callback);
  }

  // 특정 글 가져오기
  getNoticeById(noticeId, callback) {
    const query = 'SELECT * FROM notice WHERE id = ?';
    connection.query(query, [noticeId], callback);
  }

  // 특정 글 가져오기
  getNoticeByTitle(searchTitle, callback) {
    const query = 'SELECT * FROM notice WHERE title LIKE ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm], callback);
  }

  // 업데이트
  updateNotice(noticeId, updatedData, callback) {
    const query = 'UPDATE notice SET ? WHERE id = ?';
    connection.query(query, [updatedData, noticeId], callback);
  }

  // 삭제
  deleteNotice(noticeId, callback) {
    const query = 'DELETE FROM notice WHERE id = ?';
    connection.query(query, [noticeId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = Notice;
const connection = require('../../config/DBconfig');

class KU_list {
    // 글 생성
  createList(listData, callback) {
    const query = 'INSERT INTO ku_list SET ?';
    connection.query(query, listData, callback);
  }

  //페이지네이션 (전체)
  getListsPerPage(perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM ku_list ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [offset, perPage], callback);
  }

  //페이지네이션 (검색)
  getListsByCategoryPerPage(category, perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM ku_list WHERE category = ? ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [category, offset, perPage], callback);
  }

  // 신고 페이지네이션 (전체)
  getReportedListsPerPage(perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM ku_list WHERE report >= 10 ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [offset, perPage], callback);
  }

  // 신고 페이지네이션 (검색)
  getReportedListsByCategoryPerPage(category, perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM ku_list WHERE category = ? AND report >= 10 ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [category, offset, perPage], callback);
  }

  // 모든 글 정보 가져오기
  getAllLists(callback) {
    const query = 'SELECT * FROM ku_list';
    connection.query(query, callback);
  }

  // 특정 글 가져오기
  getListById(listId, callback) {
    const query = 'SELECT * FROM ku_list WHERE id = ?';
    connection.query(query, [listId], callback);
  }

  // 특정 카테고리 글 가져오기
  getListByCategory(category, callback) {
    const query = 'SELECT * FROM ku_list WHERE category = ?';
    connection.query(query, [category], callback);
  }

  // 신고된 모든 글 정보 가져오기 
  getAllReportedLists(callback) {
    const query = 'SELECT * FROM ku_list WHERE report >= 10';
    connection.query(query, callback);
  }

  // 신고된 특정 카테고리 글 가져오기
  getReportedListByCategory(category, callback) {
    const query = 'SELECT * FROM ku_list WHERE category = ? AND report >= 10';
    connection.query(query, [category], callback);
  }

  // 특정 유저 글 가져오기
  getListByAuthor(userId, callback) {
    const query = 'SELECT * FROM ku_list WHERE author = ? ORDER BY id DESC';
    connection.query(query, [userId], callback);
  }

  // 신고 수 증가
  increaseReportCount(postId, callback) {
    const query = 'UPDATE ku_list SET report = report + 1 WHERE id = ?';
    connection.query(query, [postId], callback);
  }

  // 업데이트
  updateList(listId, updatedData, callback) {
    const query = 'UPDATE ku_list SET ? WHERE id = ?';
    connection.query(query, [updatedData, listId], callback);
  }

  // 삭제
  deleteList(listId, callback) {
    const query = 'DELETE FROM ku_list WHERE id = ?';
    connection.query(query, [listId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = KU_list;
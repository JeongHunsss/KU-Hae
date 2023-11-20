class KU_list {
    // 글 생성
  createList(listData, callback) {
    const query = 'INSERT INTO ku_list SET ?';
    connection.query(query, listData, callback);
  }

    // 모든 글 정보 가져오기
  getAllLists(callback) {
    const query = 'SELECT * FROM ku_list';
    connection.query(query, callback);
  }

    // 특정 유저 가져오기
  getListById(listId, callback) {
    const query = 'SELECT * FROM ku_list WHERE id = ?';
    connection.query(query, [listId], callback);
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
}

module.exports = KU_list;
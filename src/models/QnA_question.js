const connection = require('../../config/DBconfig');

class QnA_question {
    // 질문 생성
  createQuestion(questionData, callback) {
    const query = 'INSERT INTO qna_question SET ?';
    connection.query(query, questionData, callback);
  }

  //페이지네이션 (전체)
  getQuestionPerPage(perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM qna_question ORDER BY id DESC LIMIT ?, ?';
    connection.query(query, [offset, perPage], callback);
  }

  //페이지네이션 (검색)
  getQuestionByTitlePerPage(searchTitle, perPage, page, callback) {
    const offset = (page - 1) * perPage; // 해당 페이지의 시작 오프셋
  
    const query = 'SELECT * FROM qna_question WHERE title LIKE ? ORDER BY id DESC LIMIT ?, ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm, offset, perPage], callback);
  }

  // 모든 질문 정보 가져오기
  getAllQuestion(callback) {
    const query = 'SELECT * FROM qna_question';
    connection.query(query, callback);
  }

  // 특정 질문 가져오기
  getQuestionById(questionId, callback) {
    const query = 'SELECT * FROM qna_question WHERE id = ?';
    connection.query(query, [questionId], callback);
  }

  // 특정 질문 가져오기
  getQuestionByTitle(searchTitle, callback) {
    const query = 'SELECT * FROM qna_question WHERE title LIKE ?';
    const searchTerm = '%' + searchTitle + '%'
    connection.query(query, [searchTerm], callback);
  }

  // 업데이트
  updateQuestion(questionId, updatedData, callback) {
    const query = 'UPDATE qna_question SET ? WHERE id = ?';
    connection.query(query, [updatedData, questionId], callback);
  }

  // 삭제
  deleteQuestion(questionId, callback) {
    const query = 'DELETE FROM qna_question WHERE id = ?';
    connection.query(query, [questionId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = QnA_question;
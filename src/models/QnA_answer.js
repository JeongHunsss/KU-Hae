const connection = require('../../config/DBconfig');

class QnA_answer {
    // 답변 생성
  createAnswer(answerData, callback) {
    const query = 'INSERT INTO qna_answer SET ?';
    connection.query(query, answerData, callback);
  }

  // 특정 질문에 대한 답변 가져오기
  getAnswerByquestionId(questionId, callback) {
    const query = 'SELECT * FROM qna_answer WHERE question_id = ?';
    connection.query(query, [questionId], callback);
  }

  // 업데이트
  updateAnswer(answerId, updatedData, callback) {
    const query = 'UPDATE qna_answer SET ? WHERE id = ?';
    connection.query(query, [updatedData, answerId], callback);
  }

  // 삭제
  deleteAnswer(answerId, callback) {
    const query = 'DELETE FROM qna_answer WHERE id = ?';
    connection.query(query, [answerId], callback);
  }

  // 연결 종료
  closeConnection() {
    connection.end();
  }
}

module.exports = QnA_answer;
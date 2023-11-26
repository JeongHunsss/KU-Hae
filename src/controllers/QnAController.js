const QnA_question = require('../models/QnA_question');
const QnA_answer = require('../models/QnA_answer');


// 모든 글 정보 가져오기
exports.PageOpen = (req, res) => {
  const perPage = 3; // 페이지당 아이템 수
  const page = req.query.page || 1; // 페이지 번호, 기본값은 1
  const searchTitle = req.query.searchTitle;
  
  const question = new QnA_question();

  // 검색X (전체 글)
  if(!searchTitle) {
    question.getAllQuestion((err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        question.getQuestionPerPage(perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('qna', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle: '전체'});
          }
        });
      }
    });
  } else {  //검색O (특정 제목)
    question.getQuestionByTitle(searchTitle, (err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        question.getQuestionByTitlePerPage(searchTitle, perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('qna', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle});
          }
        });
      }
    });
  }
};

exports.ViewDetail = (req, res) => {
    const question = new QnA_question();
    const answer = new QnA_answer();
  
    const questionId = req.query.questionId;
  
    question.getQuestionById(questionId, (err, question) => {
      if (err) {
        console.error('글 보기 오류:', err);
        res.status(500).json({ error: '글 보기 실패' });
      } else {
        answer.getAnswerByquestionId(questionId, (err, answer) => {
            if (err) {
              console.error('글 보기 오류:', err);
              res.status(500).json({ error: '글 보기 실패' });
            } else {
                res.render('qna_detail', {question, answer, user: req.session.user, rooms: req.session.rooms});
            }
        });
      }
    });
}


// 질문 글쓰기
exports.AddQestion = (req, res) => {
    const question = new QnA_question();
  
    const questionData = {
      title : req.body.title,
      content : req.body.content,
      author : req.body.author
    }
  
    question.createQuestion(questionData, (err, lists) => {
      if (err) {
        console.error('질문 작성 오류:', err);
        res.status(500).json({ error: '질문 작성 실패' });
      } else {
        res.status(200).json({message: '질문 작성 성공'});
      }
    });
};

// 질문 글 삭제하기
exports.DeleteQuestion = (req, res) => {
    const question = new QnA_question();
  
    const questionId = req.body.questionId;
  
    question.deleteQuestion(questionId, (err, lists) => {
      if (err) {
        console.error('질문 삭제 오류:', err);
        res.status(500).json({ error: '질문 삭제 실패' });
      } else {
        res.status(200).json({message: '질문 삭제 성공'});
      }
    });
};

// 답변 글쓰기
exports.AddAnswer = (req, res) => {
    const answer = new QnA_answer();
    const question = new QnA_question();

    const questionId = req.body.questionId;
  
    const answerData = {
      content : req.body.content,
      author : req.body.author,
      question_id: req.body.questionId
    }
  
    answer.createAnswer(answerData, (err, lists) => {
      if (err) {
        console.error('답변 작성 오류:', err);
        res.status(500).json({ error: '답변 작성 실패' });
      } else {

        const updatedData = {
            is_answered: 1
        }

        question.updateQuestion(questionId, updatedData, (err, lists) => {
            if (err) {
              console.error('질문 수정 오류:', err);
              res.status(500).json({ error: '질문 수정 실패' });
            } else {
                res.status(200).json({message: '답변 작성 성공'});
            }
        });
      }
    });
};

// 답변 수정하기
exports.EditAnswer = (req, res) => {
    const answer = new QnA_answer();
    const answerId = req.body.answerId;
  
    const updatedData = {
      content : req.body.content,
      author : req.body.author,
    }
  
    answer.updateAnswer(answerId, updatedData, (err, lists) => {
      if (err) {
        console.error('답변 수정 오류:', err);
        res.status(500).json({ error: '답변 수정 실패' });
      } else {
        res.status(200).json({message: '답변 수정 성공'});
      }
    });
};

// 답변 삭제하기
exports.DeleteAnswer = (req, res) => {
    const answer = new QnA_answer();
    const question = new QnA_question();
  
    const answerId = req.body.answerId;
    const questionId = req.body.questionId;
  
    answer.deleteAnswer(answerId, (err, lists) => {
      if (err) {
        console.error('답변 삭제 오류:', err);
        res.status(500).json({ error: '답변 삭제 실패' });
      } else {
        const updatedData = {
            is_answered: 0
        }
        question.updateQuestion(questionId, updatedData, (err, lists) => {
            if (err) {
              console.error('질문 수정 오류:', err);
              res.status(500).json({ error: '질문 수정 실패' });
            } else {
                res.status(200).json({message: '답변 삭제 성공'});
            }
        });
      }
    });
};
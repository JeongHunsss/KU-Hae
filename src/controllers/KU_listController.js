const KU_list = require('../models/KU_list');
const Report_log = require('../models/Report_log');

// 모든 글 정보 가져오기
exports.PageOpen = (req, res) => {
  const perPage = 10; // 페이지당 아이템 수
  const page = req.query.page || 1; // 페이지 번호, 기본값은 1
  const category = req.query.category; // 카테고리가 없으면 빈 문자열
  
  const ku_list = new KU_list();

  // 검색X (전체 글)
  if(!category) {
    ku_list.getAllLists((err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        ku_list.getListsPerPage(perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('ku_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, category: '전체'});
          }
        });
      }
    });
  } else {  //검색O (특정 카테고리)
    ku_list.getListByCategory(category, (err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        ku_list.getListsByCategoryPerPage(category, perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('ku_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, category});
          }
        });
      }
    });
  }
};

// 글쓰기
exports.AddList = (req, res) => {
  const ku_list = new KU_list();

  const listData = {
    title : req.body.title,
    content : req.body.content,
    category : req.body.category,
    is_Online : req.body.meeting_type,
    author : req.body.author
  }

  ku_list.createList(listData, (err, lists) => {
    if (err) {
      console.error('글쓰기 오류:', err);
      res.status(500).json({ error: '글쓰기 실패' });
    } else {
      res.status(200).json({message: '글 작성 성공'});
    }
  });
};

// 글 수정 페이지
exports.EditListPage = (req, res) => {
  const ku_list = new KU_list();
  const listId = req.query.listId;

  ku_list.getListById(listId, (err, list) => {
    if (err) {
      console.error('글 정보 가져오기 오류:', err);
      res.status(500).json({ error: '글 정보 가져오기 실패' });
    } else {
      res.render('ku_add', {list, user: req.session.user, rooms: req.session.rooms});
    }
  });
};

// 글 수정하기
exports.EditList = (req, res) => {
  const ku_list = new KU_list();

  const listId = req.body.listId;

  const updatedData = {
    title : req.body.title,
    content : req.body.content,
    category : req.body.category,
    is_Online : req.body.meeting_type,
    author : req.body.author
  }

  ku_list.updateList(listId, updatedData, (err, lists) => {
    if (err) {
      console.error('글 수정 오류:', err);
      res.status(500).json({ error: '글 수정 실패' });
    } else {
      res.status(200).json({message: '글 수정 성공'});
    }
  });
};

// 글 삭제하기
exports.DeleteList = (req, res) => {
  const ku_list = new KU_list();

  const listId = req.body.listId;

  ku_list.deleteList(listId, (err, lists) => {
    if (err) {
      console.error('글 삭제 오류:', err);
      res.status(500).json({ error: '글 삭제 실패' });
    } else {
      res.status(200).json({message: '글 삭제 성공'});
    }
  });
};

// 신고하기
exports.ReportList = (req, res) => {
  const ku_list = new KU_list();
  const report_log = new Report_log();
  
  const reportData = {
    user_id: req.body.userId,
    post_id: req.body.postId
  };

  report_log.getLogById(reportData.user_id, reportData.post_id, (err, reportLog) => {
    if (err) {
      console.error('로그 가져오기 오류:', err);
      res.status(500).json({ error: '로그 가져오기 실패' });
    } else {
      if (reportLog.length > 0) {
        res.status(200).json({ message: '이미 신고한 글입니다.' });
      } else {
        // 신고한 로그가 없으면 로그 생성 후 신고 수를 증가시킴
        report_log.createLog(reportData);
        ku_list.increaseReportCount(reportData.post_id, (increaseErr) => {
          if (increaseErr) {
            console.error('신고 수 증가 오류:', increaseErr);
            res.status(500).json({ error: '신고 수 증가 실패' });
          } else {
            res.status(200).json({ message: '신고 완료' });
          }
        });
      }
    }
  });
};
const Notice = require('../models/Notice');


// 모든 글 정보 가져오기
exports.PageOpen = (req, res) => {
  const perPage = 4; // 페이지당 아이템 수
  const page = req.query.page || 1; // 페이지 번호, 기본값은 1
  const searchTitle = req.query.searchTitle;
  
  const notice = new Notice();

  // 검색X (전체 글)
  if(!searchTitle) {
    notice.getAllNotice((err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        notice.getNoticePerPage(perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('notice_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle: '전체'});
          }
        });
      }
    });
  } else {  //검색O (특정 제목)
    notice.getNoticeByTitle(searchTitle, (err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        notice.getNoticeByTitlePerPage(searchTitle, perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('notice_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle});
          }
        });
      }
    });
  }
};

exports.ViewDetail = (req, res) => {
    const notice = new Notice();
  
    const noticeId = req.query.noticeId;
  
    notice.getNoticeById(noticeId, (err, list) => {
      if (err) {
        console.error('글 보기 오류:', err);
        res.status(500).json({ error: '글 보기 실패' });
      } else {
        res.render('notice_detail', {list, user: req.session.user, rooms: req.session.rooms});
      }
    });
}

// 글쓰기
exports.AddNotice = (req, res) => {
    const notice = new Notice();
  
    const noticeData = {
      title : req.body.title,
      content : req.body.content,
      author : req.body.author
    }
  
    notice.createNotice(noticeData, (err, lists) => {
      if (err) {
        console.error('글쓰기 오류:', err);
        res.status(500).json({ error: '글쓰기 실패' });
      } else {
        res.status(200).json({message: '글 작성 성공'});
      }
    });
};

// 글 수정 페이지
exports.EditNoticePage = (req, res) => {
    const notice = new Notice();
    const noticeId = req.query.noticeId;
  
    notice.getNoticeById(noticeId, (err, list) => {
      if (err) {
        console.error('글 정보 가져오기 오류:', err);
        res.status(500).json({ error: '글 정보 가져오기 실패' });
      } else {
        res.render('notice_add', {list, user: req.session.user, rooms: req.session.rooms});
      }
    });
};

// 글 수정하기
exports.EditNotice = (req, res) => {
    const notice = new Notice();
  
    const noticeId = req.body.noticeId;
  
    const updatedData = {
      title : req.body.title,
      content : req.body.content,
      author : req.body.author
    }
  
    notice.updateNotice(noticeId, updatedData, (err, lists) => {
      if (err) {
        console.error('글 수정 오류:', err);
        res.status(500).json({ error: '글 수정 실패' });
      } else {
        res.status(200).json({message: '글 수정 성공'});
      }
    });
};

// 글 삭제하기
exports.DeleteNotice = (req, res) => {
    const notice = new Notice();
  
    const noticeId = req.body.noticeId;
  
    notice.deleteNotice(noticeId, (err, lists) => {
      if (err) {
        console.error('글 삭제 오류:', err);
        res.status(500).json({ error: '글 삭제 실패' });
      } else {
        res.status(200).json({message: '글 삭제 성공'});
      }
    });
};

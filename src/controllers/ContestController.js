const Contest = require('../models/Contest');


// 모든 글 정보 가져오기
exports.PageOpen = (req, res) => {
  const perPage = 6; // 페이지당 아이템 수
  const page = req.query.page || 1; // 페이지 번호, 기본값은 1
  const searchTitle = req.query.searchTitle;
  
  const contest = new Contest();

  // 검색X (전체 글)
  if(!searchTitle) {
    contest.getAllContest((err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        contest.getContestPerPage(perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('contest_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle: '전체'});
          }
        });
      }
    });
  } else {  //검색O (특정 제목)
    contest.getContestByTitle(searchTitle, (err, result) => {
      if (err) {
        console.error('리스트 불러오기 오류:', err);
        res.status(500).json({ error: '리스트 불러오기 오류' });
      } else {
        const totalList = result.length;
        // 페이지네이션 페이지 수 계산
        const totalPages = Math.ceil(totalList / perPage);
        
        contest.getContestByTitlePerPage(searchTitle, perPage, page, (err, lists) => {
          if (err) {
            console.error('글 정보 가져오기 오류:', err);
            res.status(500).json({ error: '글 정보 가져오기 실패' });
          } else {
            res.render('contest_list', {lists, user: req.session.user, rooms: req.session.rooms, totalPages, searchTitle});
          }
        });
      }
    });
  }
};
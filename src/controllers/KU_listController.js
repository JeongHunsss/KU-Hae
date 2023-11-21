const KU_list = require('../models/KU_list');
const Report_log = require('../models/Report_log');

// 모든 글 정보 가져오기
exports.PageOpen = (req, res) => {
    const ku_list = new KU_list();
  
    ku_list.getAllLists((err, lists) => {
      if (err) {
        console.error('글 정보 가져오기 오류:', err);
        res.status(500).json({ error: '글 정보 가져오기 실패' });
      } else {
        const user = req.session.user;
        res.render('ku_list', {lists, user});
      }
    });
  };

// 신고하기
exports.ReportList = (req, res) => {
  const ku_list = new KU_list();
  const report_log = new Report_log();
  
  const reportData = {
    userId: req.body.userId,
    postId: req.body.postId
  };

  report_log.getListById({ userId, postId }, (err, reportLog) => {
    if (err) {
      console.error('로그 가져오기 오류:', err);
      res.status(500).json({ error: '로그 가져오기 실패' });
    } else {
      if (reportLog.length > 0) {
        res.status(200).json({ message: '이미 신고한 글입니다.' });
      } else {
        report_log.createLog(reportData);
        // 신고한 로그가 없으면, 신고 수를 증가시킴 (이는 예시로 신고 수를 올리는 로직입니다)
        ku_list.increaseReportCount(postId, (increaseErr) => {
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
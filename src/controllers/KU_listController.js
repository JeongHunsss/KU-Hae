const KU_list = require('../models/KU_list');

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
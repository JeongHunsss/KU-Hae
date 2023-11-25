const Chat_request = require('../models/Chat_request');

// 요청 생성
exports.createRequest = (req, res) => {
    const requestData = {
      sender: req.body.sender,
      receiver: req.body.receiver,
      list_title: req.body.title,
    };

    const chat_request = new Chat_request();

    chat_request.createRequest(requestData, (err, result) => {
      if (err) {
        console.error('요청 오류:', err);
        return res.status(500).json({ message: '요청 실패', details: err.message });
      } else {
        return res.status(200).json({ message: '요청 성공'});
      }
    });
};

// 요청 수락
exports.acceptRequest = (req, res) => {
};

// 요청 거절
exports.rejectRequest = (req, res) => {
    const requestId = req.body.requestId;

    const chat_request = new Chat_request();

    chat_request.deleteRequest(requestId, (err, result) => {
      if (err) {
        console.error('요청 거절 오류:', err);
        return res.status(500).json({ message: '요청 거절 실패', details: err.message });
      } else {
        return res.status(200).json({ message: '요청 거절 성공'});
      }
    });
};

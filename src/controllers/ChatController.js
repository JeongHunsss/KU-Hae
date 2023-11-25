const Chat_request = require('../models/Chat_request');
const Chat_rooms = require('../models/Chat_rooms');

const socketIO = require('socket.io');

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
  const roomData = {
    sender: req.body.sender,
    receiver: req.body.receiver
  };

  const chat_rooms = new Chat_rooms();

  chat_rooms.createRoom(roomData, (err, result) => {
    if (err) {
      console.error('방 생성 오류:', err);
      return res.status(500).json({ message: '방 생성 실패', details: err.message });
    } else {
      return res.status(200).json({ message: '방 생성 성공'});
    }
  });
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

// 서버를 Express 애플리케이션과 연결
exports.initSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('새로운 사용자가 접속했습니다.');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId); // 클라이언트를 해당 방에 참여시킴
      console.log(`사용자가 ${roomId} 방에 참여했습니다.`);
    });

    socket.on('message', (data) => {
      console.log('받은 메시지:', data);
      io.to(data.room).emit('message', data.message); // 특정 방에만 메시지 전송
    });

    socket.on('disconnect', () => {
      console.log('사용자가 나갔습니다.');
    });
  });
}
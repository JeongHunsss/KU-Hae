const Chat_request = require('../models/Chat_request');
const Chat_rooms = require('../models/Chat_rooms');
const Chat_messages = require('../models/Chat_messages');

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
  const requestId = req.body.requestId;

  const chat_rooms = new Chat_rooms();
  const chat_request = new Chat_request();

  chat_rooms.createRoom(roomData, (err, result) => {
    if (err) {
      console.error('방 생성 오류:', err);
      return res.status(500).json({ message: '요청 수락 실패', details: err.message });
    } else {
      chat_request.deleteRequest(requestId, (err, result) => {
        if (err) {
          console.error('요청 수락 오류:', err);
          return res.status(500).json({ message: '요청 수락 실패', details: err.message });
        } else {
          // 유저 채팅방 목록 가져오기
          chat_rooms.getRoomByuserId(req.session.user.user_id, (err, rooms) => {
            if (err) {
              console.error('채팅방 가져오기 오류:', err);
              return res.status(500).json({ message: '채팅방 가져오기 실패', details: err.message });
            } else {
              req.session.rooms = rooms;
              return res.status(200).json({ message: '요청 수락 성공'});
            }
          });
        }
      });
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
  const chat_messages = new Chat_messages();

  io.on('connection', (socket) => {
    console.log('사용자가 접속했습니다.');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`사용자가 ${roomId} 방에 참여했습니다.`);
    });

    socket.on('message', (data) => {
      console.log('받은 메시지:', data);
      
      const Data = {
        room_id: data.room,
        sender: data.sender,
        text: data.message,
      };

      io.to(data.room).emit('message', {message: data.message, sender: data.sender});
      chat_messages.createMessages(Data, (err, result) => {
        if (err) {
          console.error('메시지 저장 실패:', err);
        } else {
          console.log('메시지 저장 성공');
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('사용자가 나갔습니다.');
    });
  });
};

exports.getChatting = (req, res) => {
  const chat_messages = new Chat_messages();
  const roomId = req.body.roomId;

  chat_messages.getMessagesByroomId(roomId, (err, result) => {
    if (err) {
      console.error('리스트 불러오기 오류:', err);
      res.status(500).json({ error: '리스트 불러오기 오류' });
    } else {
      console.log(result);
      res.status(200).json({messages: result, roomId});
    }
  });
};
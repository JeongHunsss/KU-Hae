const KU_list = require('../models/KU_list');
const User = require('../models/User');
const Chat_request = require('../models/Chat_request');

// 마이페이지 열었을 때 (검색 포함)
exports.PageOpen = (req, res) => {
    const userId = req.query.userId;
    
    const ku_list = new KU_list();
    const user = new User();
    const chat_request = new Chat_request();
  
    // 유저 정보 가져오기
    user.getUserById(userId, (err, userData) => {
        if (err) {
            console.error('유저 불러오기 오류:', err);
            res.status(500).json({ error:  '유저 불러오기 오류' });
        } else {
            // 유저가 존재한다면
            if(userData.length > 0) {
                ku_list.getListByAuthor(userId, (err, lists) => {
                    if (err) {
                        console.error('리스트 불러오기 오류:', err);
                        res.status(500).json({ error: '리스트 불러오기 오류' });
                    } else {
                        chat_request.getRequestById(userId, (err, requests) => {
                            if (err) {
                                console.error('요청 불러오기 오류:', err);
                                res.status(500).json({ error: '요청 불러오기 오류' });
                            } else {
                                res.render('my_page', {lists, requests, userData, user: req.session.user, message: ''});
                            }
                        });
                    }
                });
            // 유저가 존재하지 않다면 (본인을 검색하게)
            } else {
                ku_list.getListByAuthor(req.session.user.user_id, (err, lists) => {
                    if (err) {
                        console.error('리스트 불러오기 오류:', err);
                        res.status(500).json({ error: '리스트 불러오기 오류' });
                    } else {
                        user.getUserById(req.session.user.user_id, (err, userData) => {
                            if (err) {
                                console.error('유저 불러오기 오류:', err);
                                res.status(500).json({ error:  '유저 불러오기 오류' });
                            } else {
                                chat_request.getRequestById(req.session.user.user_id, (err, requests) => {
                                    if (err) {
                                        console.error('요청 불러오기 오류:', err);
                                        res.status(500).json({ error: '요청 불러오기 오류' });
                                    } else {
                                        res.render('my_page', {lists, requests, userData, user: req.session.user, message: '존재하지 않는 유저입니다.'});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

// 비밀번호 확인
exports.ConfirmPassword = (req, res) => {
    const userId = req.session.user.user_id;
    const password = req.body.password;
    
    const ku_list = new KU_list();
    const user = new User();
  
    user.loginUser(userId, password, (err, result) => {
        if (err) {
            console.error('로그인 오류:', err);
            res.status(500).send('로그인 실패');
        } else if (result) { // 비밀번호 일치
            // 유저 정보 가져오기
            user.getUserById(userId, (err, userData) => {
                if (err) {
                    console.error('유저 불러오기 오류:', err);
                    res.status(500).json({ error:  '유저 불러오기 오류' });
                } else {
                    ku_list.getListByAuthor(userId, (err, lists) => {
                        if (err) {
                            console.error('리스트 불러오기 오류:', err);
                            res.status(500).json({ error: '리스트 불러오기 오류' });
                        } else {
                            res.status(200).json({PasswordMessage: '일치합니다.', isOK: true});
                        }
                    });
                }
            });
        } else {
            // 유저 정보 가져오기
            user.getUserById(userId, (err, userData) => {
                if (err) {
                    console.error('유저 불러오기 오류:', err);
                    res.status(500).json({ error:  '유저 불러오기 오류' });
                } else {
                    ku_list.getListByAuthor(userId, (err, lists) => {
                        if (err) {
                            console.error('리스트 불러오기 오류:', err);
                            res.status(500).json({ error: '리스트 불러오기 오류' });
                        } else {
                            res.status(200).json({PasswordMessage: '일치하지 않습니다.', isOK: false});
                        }
                    });
                }
            });
        }
    });
}
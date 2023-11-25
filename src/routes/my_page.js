const express = require('express');
const router = express.Router();

const my_pageController = require('../controllers/My_pageController');
const userController = require('../controllers/UserController');


router.get('/', my_pageController.PageOpen);

router.post('/confirmpassword', my_pageController.ConfirmPassword);
router.post('/changepassword', userController.ChangePassword);
router.post('/uppassion', userController.UpPassion);
router.post('/downpassion', userController.DownPassion);
router.post('/updateprofile', userController.UpdateProfile);

module.exports = router;
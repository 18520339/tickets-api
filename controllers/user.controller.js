const express = require('express');
const {
	createUser,
	login,
	updatePassword,
	getMe,
	uploadAvatar,
} = require('../services/user.service');
const {
	validateCreateUser,
} = require('../middleware/validation/user/create-user.validation');

const { authenticate, authorize } = require('../middleware/auth');
const { uploadImage } = require('../middleware/image');
const router = express.Router();

router.post('/user', validateCreateUser, createUser);
router.post('/user/login', login);
router.patch('/user/update-password', updatePassword);
router.get('/user/me', authenticate, authorize(['Admin', 'Member']), getMe);
router.post(
	'/user/upload-avatar',
	authenticate,
	authorize(['Member']),
	uploadImage('avatar'),
	uploadAvatar,
);
module.exports = router;

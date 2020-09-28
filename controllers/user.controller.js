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

router.post('/users', validateCreateUser, createUser);
router.post('/users/login', login);
router.patch('/users/update-password', updatePassword);
router.get('/users/me', authenticate, authorize(['Admin', 'Member']), getMe);
router.post(
	'/users/upload-avatar',
	authenticate,
	authorize(['Member']),
	uploadImage('avatar'),
	uploadAvatar,
);
module.exports = router;

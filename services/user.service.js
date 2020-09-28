const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { use } = require('../controllers/user.controller');
const { User } = require('../models/user.model');
const jwtSign = util.promisify(jwt.sign); // chuyen callback -> promise

module.exports.createUser = (req, res, next) => {
	const { email, password, fullName } = req.body;
	User.create({ email, password, fullName })
		.then(user => res.status(200).json(user))
		.catch(err => res.status(500).json(err));
};

module.exports.login = (req, res, next) => {
	const { email, password } = req.body;
	let _user;
	User.findOne({ email })
		.then(user => {
			if (!user)
				return Promise.reject({
					status: 404,
					message: 'User Not Found',
				});
			_user = user;
			return bcrypt.compare(password, user.password);
		})
		.then(isMatched => {
			if (!isMatched)
				return Promise.reject({
					status: 404,
					message: 'Password incorrect',
				});

			const { _id, email, fullName, userType } = _user;
			const payload = { _id, email, fullName, userType };
			// jwtSign.sign(
			// 	payload,
			// 	'abcdefghijklmn',
			// 	{ expiresIn: '1h' },
			// 	(err, token) => res.send(token),
			// );
			return jwtSign(payload, 'abcdefghijklmn', { expiresIn: '1h' });
		})
		.then(token => {
			res.status(200).json({ message: 'Login successfully', token });
		})
		.catch(err => res.json(err));
};

module.exports.updatePassword = (req, res, next) => {
	const { email, oldPassword, newPassword } = req.body;
	let _user;
	// Ko dat breakpoint ngay then
	User.findOne({ email })
		.then(user => {
			if (!user)
				return Promise.reject({
					status: 404,
					message: 'User Not Found',
				});
			_user = user;
			return bcrypt.compare(oldPassword, user.password);
		})
		.then(isMatched => {
			if (!isMatched)
				return Promise.reject({
					status: 404,
					message: 'Password incorrect',
				});
			_user.password = newPassword;
			return _user.save();
		})
		.then(() => {
			res.status(200).json({ message: 'Update password successfully' });
		})
		.catch(err => res.json(err));
};

module.exports.getMe = (req, res, next) => {
	res.status(200).json(req.user);
};

module.exports.uploadAvatar = (req, res, next) => {
	User.findById(req.user._id)
		.then(user => {
			if (!user) return Promise.reject({ message: 'User Not Found' });
			user.avatarUrl = `${req.file.fieldname}s/${req.file.filename}`;
			return user.save();
		})
		.then(user => res.status(200).json(user))
		.catch(err => res.json(err));
};

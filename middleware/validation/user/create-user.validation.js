const validator = require('validator');
const _ = require('lodash');
const { User } = require('../../../models/user.model');

module.exports.validateCreateUser = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirm = req.body.confirm;
	const fullName = req.body.fullName;
	const errors = {};

	// email
	if (!email) errors.email = 'Email is required';
	else if (!validator.default.isEmail(email)) {
		errors.email = 'Email is invalid';
	} else {
		const user = await User.findOne({ email });
		if (user) errors.email = 'Email exists';
	}

	// password
	if (!password) errors.password = 'Password is required';
	else if (!validator.default.equals(password, confirm)) {
		errors.password = 'Password must match';
	}

	// confirm
	if (!confirm) errors.confirm = 'Confirm is required';
	else if (!validator.default.equals(password, confirm)) {
		errors.confirm = 'Password must match';
	}

	// fullName
	if (!fullName) errors.fullName = 'Full name is required';

	if (Object.keys(errors).length > 0) return res.status(400).json(errors);
	return next();
};

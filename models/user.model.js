const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	fullName: { type: String, required: true },
	userType: { type: String, default: 'Member' },
	avatarUrl: { type: String },
});

// ko xai arrow func vi ko co con tro this
// save chay truoc khi luu vao DB
UserSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	bcrypt
		.genSalt(10)
		.then(salt => bcrypt.hash(user.password, salt))
		.then(hash => {
			user.password = hash;
			next(); // khi thu hien xong se chay lai qua service
		});
});
const User = mongoose.model('User', UserSchema, 'User');
module.exports = { UserSchema, User };

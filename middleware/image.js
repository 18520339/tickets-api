const multer = require('multer');
module.exports.uploadImage = type => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, `${__dirname}/../images/${type}s`);
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + '-' + file.originalname);
		},
	});
	const upload = multer({ storage });
	return upload.single(type);
};

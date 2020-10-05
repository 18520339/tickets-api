const dotenv = require('dotenv');
const envPath = `${__dirname}/../.env.${process.env.NODE_ENV}`;

dotenv.config({ path: envPath });
console.log(process.env.NODE_ENV);

const { MONGO_URI, JWT_SECRET_KEY, USER, PASS } = process.env;
module.exports = {
	MONGO_URI,
	JWT_SECRET_KEY,
	USER,
	PASS,
};

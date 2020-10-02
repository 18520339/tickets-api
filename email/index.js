const nodemailer = require('nodemailer');
const hogan = require('hogan.js');
const fs = require('fs'); // built-in package

// Co thay doi trong file hjs f tat server chay lai
const template = fs.readFileSync(`${__dirname}/template.hjs`, 'utf-8');
const compiledTemplate = hogan.compile(template); // string => hogan

module.exports.sendBookTicketEmail = email => {
	const transport = {
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: True,
		requireSSL: True,
		auth: {
			user: '',
			pass: '',
		},
	};

	const transporter = nodemailer.createTransport(transport);
	const mailOptions = {
		from: '',
		to: email,
		subject: 'Ticket Booking Infomation',
		html: compiledTemplate.render({ email }),
	};

	transporter.sendMail(mailOptions, err => {
		if (err) return console.log(err);
		console.log('Success');
	});
};

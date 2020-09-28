const express = require('express');
const mongoose = require('mongoose');

const stationController = require('./controllers/station.controller');
const tripController = require('./controllers/trip.controller');
const userController = require('./controllers/user.controller');

const app = express();
mongoose
	.connect('mongodb://localhost:27017/vexere', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connect to DB successfully'))
	.catch(console.log);

app.use(express.json()); // de parse post request;
app.use('/images', express.static('images'));
app.use('/api', stationController);
app.use('/api', tripController);
app.use('/api', userController);
app.listen(5000, () => console.log('App is running on port 5000'));
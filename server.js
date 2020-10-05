const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const stationController = require('./controllers/station.controller');
const tripController = require('./controllers/trip.controller');
const userController = require('./controllers/user.controller');
const ticketController = require('./controllers/ticket.controller');

const app = express();
mongoose
	.connect(config.MONGO_URI, {
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
app.use('/api', ticketController);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`App is running on port ${port}`));

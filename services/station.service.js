const { Promise } = require('mongoose');
const { Station } = require('../models/station.model');
module.exports.getStations = (req, res, next) => {
	return Station.find()
		.then(stations => res.status(200).json(stations))
		.catch(err => res.status(500).json(err));
};
module.exports.createStation = (req, res, next) => {
	const { name, address, province } = req.body;
	return Station.create({ name, address, province })
		.then(station => res.status(201).json(station))
		.catch(err => res.status(500).json(err));
};
// PUT /api/stations/:stationId
module.exports.replaceStation = (req, res, next) => {
	const { stationId } = req.params;
	Station.findById(stationId)
		.then(station => {
			if (!station)
				return Promise.reject({
					status: 404,
					message: 'Station Not Found',
				});

			Object.keys(Station.schema.obj).forEach(key => {
				station[key] = req.body[key];
			});
			return station.save();
		})
		.then(station => res.status(200).json(station))
		.catch(err => res.status(500).json(err));
};
// PATCH /api/stations/:stationId
module.exports.updateStation = (req, res, next) => {
	const { stationId } = req.params;
	Station.findById(stationId)
		.then(station => {
			if (!station)
				return Promise.reject({
					status: 404,
					message: 'Station Not Found',
				});

			Object.keys(Station.schema.obj).forEach(key => {
				station[key] = req.body[key] ? req.body[key] : station[key];
			});
			return station.save();
		})
		.then(station => res.status(200).json(station))
		.catch(err => res.status(500).json(err));
};
// GET /api/stations/:stationId
module.exports.getStationById = (req, res, next) => {
	const { stationId } = req.params;
	Station.findById(stationId)
		.then(station => {
			if (!station)
				return Promise.reject({
					status: 404,
					message: 'Station Not Found',
				});
			return res.status(200).json(station);
		})
		.catch(err => res.status(500).json(err));
};
// DELETE /api/stations/:stationId
module.exports.deleteStation = (req, res, next) => {
	const { stationId } = req.params;
	let _station;
	Station.findById(stationId)
		.then(station => {
			if (!station)
				return Promise.reject({
					status: 404,
					message: 'Station Not Found',
				});
			_station = station;
			return station.deleteOne();
		})
		.then(() => res.status(200).json(_station))
		.catch(err => res.status(500).json(err));
};
// noi co the xai request
// request - params (/stations),
//           query string (?addess = ..., tren postman la params),
//           headers (token/key),
//           body (post/put/patch)

// PUT: replace, PATCH: update

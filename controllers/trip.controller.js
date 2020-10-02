const express = require('express');
const { getTrips, createTrip } = require('../services/trip.service');
const router = express.Router();

router.get('/trips', getTrips);
router.post('/trips', createTrip);
module.exports = router;

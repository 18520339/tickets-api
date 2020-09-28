const express = require('express');
const { createTrip } = require('../services/trip.service');
const router = express.Router();

router.post('/trips', createTrip);
module.exports = router;

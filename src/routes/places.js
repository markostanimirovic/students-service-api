const express = require('express');
const router = express.Router();

const PlacesController = require('../controllers/places');

router.get('/', PlacesController.getAll);
router.post('/', PlacesController.post);

module.exports = router;
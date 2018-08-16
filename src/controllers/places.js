const mongoose = require('mongoose');

const Place = require('../models/place');

module.exports.getAll = (req, res) => {
    Place.find().exec()
        .then(docs => {
            res.status(200).json({
                type: 'success',
                count: docs.length,
                places: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                type: 'error',
                message: 'Internal Server Error'
            });
        });
};

module.exports.post = (req, res) => {
    getPlacesForInsert(req.body)
        .then(placesForInsert =>
            Place.insertMany(placesForInsert)
        ).then(insertedPlaces =>
            res.status(200).json({
                type: 'success',
                result: insertedPlaces
            })
        ).catch(err =>
            res.status(400).json({
                type: 'error',
                error: err.message
            }));
};

const getPlacesForInsert = (places) => {
    return Place.find().exec()
        .then(docs => docs.map((place) => place.name))
        .then(placesFromDb =>
            places.reduce((placesForInsert, placeName) => {
                if (placesFromDb.indexOf(placeName) < 0
                    && placesForInsert.filter(element =>
                        element.name === placeName).length === 0) {
                    placesForInsert.push(fillPlaceForInsert(placeName));
                }
                return placesForInsert;
            }, []));
}

const fillPlaceForInsert = (placeName) => {
    return new Place({
        _id: new mongoose.Types.ObjectId(),
        name: placeName
    });
};
const mongoose = require('mongoose');

const Student = require('../models/student');

module.exports.getAll = (req, res, next) => {
    Student.find().exec()
        .then(docs =>
            res.status(200).json({
                type: 'success',
                count: docs.length,
                students: docs
            }))
        .catch(err => next(err));
};

module.exports.getById = (req, res, next) => {
    Student.findById(req.params.id).exec()
        .then(doc => doc ? res.status(200).json(doc) : next())
        .catch(err => next(err));
};

module.exports.post = (req, res, next) => {
    fillStudentForInsert(req)
        .save()
        .then(result =>
            res.status(200).json({
                type: 'success',
                message: 'Inserted student successfully'
            }))
        .catch(err => {
            err.name === 'ValidationError' ? err.status = 400 : null;
            next(err);
        });
};

module.exports.put = (req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, fillStudentForUpdate(req), { runValidators: true }).exec()
        .then(result =>
            result ? res.status(200).json({
                type: 'success',
                message: 'Updated student successfully'
            }) : next())
        .catch(err => {
            err.name === 'ValidationError' ? err.status = 400 : null;
            next(err);
        });
};

module.exports.patch = (req, res, next) => {
    res.status(200).json({ message: 'TODO: Implement!' });
};

module.exports.delete = (req, res, next) => {
    Student.findByIdAndRemove(req.params.id).exec()
        .then(result =>
            result ? res.status(200).json({
                type: 'success',
                message: 'Deleted student successfully'
            }) : next())
        .catch(err => next(err));
};

const fillStudentForInsert = (req) => {
    return new Student({
        _id: new mongoose.Types.ObjectId(),
        number: req.body.number,
        year: req.body.year,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthPlace: req.body.birthPlace,
        livingPlace: req.body.livingPlace,
        adress: req.body.adress,
        espb: req.body.espb,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        studyField: req.body.studyField
    });
}

const fillStudentForUpdate = (req) => {
    return new Student({
        number: req.body.number,
        year: req.body.year,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthPlace: req.body.birthPlace,
        livingPlace: req.body.livingPlace,
        adress: req.body.adress,
        espb: req.body.espb,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        studyField: req.body.studyField,
    });
};
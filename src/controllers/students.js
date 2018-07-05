const mongoose = require('mongoose');

const Student = require('../models/student');

module.exports.getAll = (req, res) => {
    Student.find().exec()
        .then(docs => {
            res.status(200).json({
                type: 'success',
                count: docs.length,
                students: docs
            });
        }).catch(err => {
            res.status(500).json({
                type: 'error',
                message: 'Internal Server Error'
            });
        });
};

module.exports.getById = (req, res) => {
    Student.findById(req.params.id).exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    type: 'success',
                    student: doc
                });
            } else {
                res.status(400).json({
                    type: 'error',
                    message: 'Bad Request. Student Not Found'
                });
            }
        }).catch(err => {
            res.status(500).json({
                type: 'error',
                message: err.message
            })
        });
};

module.exports.post = (req, res) => {
    fillStudentForInsert(req.body)
        .save()
        .then(result => {
            res.status(200).json({
                type: 'success',
                message: 'Inserted student successfully'
            });
        }).catch(err => {
            res.status(400).json({
                type: 'error',
                message: err.message
            });
        });
};

module.exports.put = (req, res) => {
    Student.findByIdAndUpdate(req.params.id,
        fillStudentForUpdate(req.body), { runValidators: true }).exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    type: 'success',
                    message: 'Updated student successfully'
                });
            } else {
                res.status(400).json({
                    type: 'error',
                    message: 'Bad Request. Student Not Found'
                });
            }
        }).catch(err => {
            res.status(400).json({
                type: 'error',
                message: err.message
            });
        });
};

module.exports.patch = (req, res) => {
    res.status(200).json({ message: 'TODO: Implement!' });
};

module.exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id).exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    type: 'success',
                    message: 'Deleted student successfully'
                });
            } else {
                res.status(400).json({
                    type: 'error',
                    message: 'Bad Request. Student Not Found'
                });
            }
        }).catch(err => {
            res.status(500).json({
                type: 'error',
                message: err.message
            });
        });
};

const fillStudentForInsert = (student) => {
    return new Student({
        _id: new mongoose.Types.ObjectId(),
        number: student.number,
        year: student.year,
        firstName: student.firstName,
        lastName: student.lastName,
        birthPlace: student.birthPlace,
        livingPlace: student.livingPlace,
        adress: student.adress,
        espb: student.espb,
        phoneNumber: student.phoneNumber,
        email: student.email,
        studyField: student.studyField
    });
}

const fillStudentForUpdate = (student) => {
    return new Student({
        number: student.number,
        year: student.year,
        firstName: student.firstName,
        lastName: student.lastName,
        birthPlace: student.birthPlace,
        livingPlace: student.livingPlace,
        adress: student.adress,
        espb: student.espb,
        phoneNumber: student.phoneNumber,
        email: student.email,
        studyField: student.studyField,
    });
};
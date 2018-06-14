const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    number: {
        type: Number,
        min: 0,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Number must be an integer value!'
        }
    },
    year: {
        type: Number,
        min: 0,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Year must be an integer value!'
        }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthPlace: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[A-ZČĆŽŠĐ]([a-zčćžšđ])+([ ][A-ZČĆŽŠĐ][a-zčćžšđ]+)*$/.test(v),
            message: 'BirthPlace is not valid!'
        }
    },
    livingPlace: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[A-ZČĆŽŠĐ]([a-zčćžšđ])+([ ][A-ZČĆŽŠĐ][a-zčćžšđ]+)*$/.test(v),
            message: 'LivingPlace is not valid!'
        }
    },
    adress: { type: String, required: true },
    espb: {
        type: Number,
        min: 0,
        max: 240,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'ESPB must be an integer value!'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[0-9]{3}[/][0-9]{6,7}$/.test(v),
            message: 'Phone number must be in format 999/999999(9)!'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
            message: 'Email is not a valid email adress!'
        }
    },
    studyField: { type: String, required: true },
    // thesis: {
    //     type: {
    //         name: { type: String, required: true },
    //         date: { type: Date, required: true },
    //         mark: {
    //             type: Number,
    //             validate: {
    //                 validator: Number.isInteger,
    //                 message: 'Mark must be an integer value!'
    //             }
    //         }
    //     }
    // },
    state: { type: Number, default: 0 }
});

module.exports = mongoose.model('Student', studentSchema, 'students');
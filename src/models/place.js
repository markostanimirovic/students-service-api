const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[A-ZČĆŽŠĐ]([a-zčćžšđ])+([ ][A-ZČĆŽŠĐ][a-zčćžšđ]+)*$/.test(v),
            message: 'Place name is not valid!'
        }
    }
});

module.exports = mongoose.model('Place', placeSchema, 'places');
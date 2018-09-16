const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

// bcrypt.hash('admin', 10)
// .then(hash => {
//     const user = new User({
//         email: 'admin@admin.com',
//         password: hash
//     });
//     user.save();
// });

// User.find().exec().then((docs) => {
//     console.log(docs);
// });

module.exports.login = (req, res) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if (!user) {
                throw new Error();
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        }).then(result => {
            if (!result) {
                throw new Error();
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, config.secret);
            res.status(200).json({
                type: 'success',
                token: token
            });
        }).catch(error => {
            return res.status(401).json({
                type: 'error',
                message: 'Auth failed!'
            })
        });
};
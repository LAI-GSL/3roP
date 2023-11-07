const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    passwordC: {type: String, required: true},
    role: { type: String, required: true, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);

userSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                let err = new Error('Usuario no encontrado.');
                err.status = 401;
                return callback(err);
            }
            if(password === user.password) { 
                return callback(null, user);
            } else {
                return callback();
            }
        });
}

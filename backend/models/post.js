const mongoose =require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    name: {type: String, require: true},
    date: {type: Date, require: true},
    time: {type: String, require: true},
    phoneNumber: {type: String, require: true},
    email: {type: String, require: true},
    notes: {type: String, require: true},
    consentConfirmation: {type: Boolean, require: true}
});

module.exports = mongoose.model('Post', postSchema);
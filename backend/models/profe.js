const mongoose =require('mongoose');

const profeSchema = mongoose.Schema({
    name: {type: String, require: true},
    profesion: {type: String, require:true},
    phoneNumber: {type: String, require: true},
    email: {type: String, require: true},
    direction: {type: String, require:true},
    country: {type: String, require: true}
});

module.exports = mongoose.model('Profe', profeSchema);
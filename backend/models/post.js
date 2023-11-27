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
    consentConfirmation: {type: Boolean, require: true},
    profesion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profe',
        required: [function() { return this.consentConfirmed; }, 'Profesion is required when consent is confirmed'], // Ejemplo de condicional
        default: null 
      }
});

module.exports = mongoose.model('Post', postSchema);
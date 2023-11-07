const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./backend/models/user'); 

mongoose.connect("mongodb+srv://LRS:LRS2000@clustersmartbooking.n9fqmlr.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });

bcrypt.hash('1234', 10, (err, hash) => {
  if (err) {
    console.error('Hubo un error al hashear la contraseña', err);
    return;
  }

  const adminUser = new User({
    name: 'Laisha',
    email: 'laisha@hotmail.com',
    password: 123, 
    passwordC: 123,
    role: 'admin'
  });

  adminUser.save()
    .then(() => {
      console.log('Usuario administrador creado con éxito');
      mongoose.disconnect(); 
    })
    .catch(error => {
      console.error('Error al crear el usuario administrador', error);
      mongoose.disconnect(); 
    });
});
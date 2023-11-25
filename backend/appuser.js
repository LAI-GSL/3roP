const express = require('express');
const bodyParser = require("body-parser");
const User = require('./models/user');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'laisha.soto14@hotmail.com',
    pass: 'platano123'
  }
});
const appuser = express();
mongoose.connect("mongodb+srv://LRS:LRS2000@clustersmartbooking.n9fqmlr.mongodb.net/")
.then(()=>{
    console.log("Base de datos conectada")
})
.catch(()=>{
    console.log("conexion fallida")
})

appuser.use(bodyParser.json());
appuser.use(bodyParser.urlencoded({extended: false}));

appuser.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")

    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

appuser.post ("/api/user", (req, res, next)=>{
  const userVerificationToken = generateVerificationToken();
    const user =new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordC: req.body.passwordC,
        isVerified: false,
        verificationToken: userVerificationToken
    });
    user.save().then(result => {
      const verificationLink = `http://localhost:2000/api/verificacion?token=${userVerificationToken}`;
      const mailOptions = {
        from: 'laisha.soto14@hotmail.com',
        to: user.email,
        subject: 'Verificación de cuenta',
        text: 'Por favor, haz clic en el enlace para verificar tu cuenta.',
        html: `<p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta: <a href="${verificationLink}">Verificar Cuenta</a>.</p>`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado: ' + info.response);
        }
      });
  })
  .catch(err => {
      res.status(500).json({ message: 'Error al registrar el usuario', error: err });
  });
});

appuser.get ('/api/user',(req, res, next) =>{

  User.find().then(documents =>{
    res.status(200).json({
        message: 'Usuarios expuestas con exito',
        users: documents
    });
  });
  
});
appuser.delete("/api/user/:id", (req, res, next)=>{
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
      }
      if (user.role === 'admin') {
        res.status(403).json({ message: 'No se puede eliminar al usuario administrador.' });
        return; 
      }

      return User.deleteOne({ _id: req.params.id });
    })
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'No se encontró el usuario para eliminar.' });
      } else {
        res.status(200).json({ message: 'Usuario eliminado.' });
      }
    })
    .catch(err => {
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: err });
      }
    });
});


appuser.post('/api/login', (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password }).then(user => {
      if(user){
          res.status(200).json({ user: user, isAdmin: user.role === 'admin' });
      } else {
          res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
  });
});

appuser.get('/api/verificacion', async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Token de verificación inválido o ya ha sido utilizado." });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Elimina el token ya que ya no será necesario
    await user.save();

    res.status(200).json({ message: "La cuenta ha sido verificada. Por favor, inicie sesión." });
  } catch (err) {
    res.status(500).json({ message: "No se pudo verificar la cuenta.", error: err });
  }
});
module.exports = appuser;
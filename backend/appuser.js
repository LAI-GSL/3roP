const express = require('express');
const bodyParser = require("body-parser");
const User = require('./models/user');
const mongoose = require("mongoose");

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
    const user =new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordC: req.body.passwordC
    });
    user.save();
    res.statusCode(201).json({
        message: 'Post Added Succesfully'
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
    User.deleteOne({
        _id: req.params.id
    }).then(result =>{
        console.log(result);
    })
    res.status(200).json({message: 'Usuario Eliminado'});
});
module.exports = appuser;
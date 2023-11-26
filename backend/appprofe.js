const express = require('express');
const bodyParser = require("body-parser");
const Profe = require('./models/profe');
const mongoose = require("mongoose");

const appprofe = express();
mongoose.connect("mongodb+srv://LRS:LRS2000@clustersmartbooking.n9fqmlr.mongodb.net/")
.then(()=>{
    console.log("Base de datos conectada")
})
.catch(()=>{
    console.log("conexion fallida")
})

appprofe.use(bodyParser.json());
appprofe.use(bodyParser.urlencoded({extended: false}));

appprofe.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")

    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

appprofe.post ("/api/profe", (req, res, next)=>{
    const profe =new Profe({
        name: req.body.name,
        profesion: req.body.profesion,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        direction:req.body.direction,
        country:req.body.country
    });
    profe.save();
    res.statusCode(201).json({
        message: 'Profe Added Succesfully'
    });
});

appprofe.get ('/api/profe',(req, res, next) =>{

  Profe.find().then(documents =>{
    res.status(200).json({
        message: 'Publicaciones expuestas con exito',
        profes: documents
    });
  });
  
});
appprofe.delete("/api/profe/:id", (req, res, next)=>{
    Profe.deleteOne({
        _id: req.params.id
    }).then(result =>{
        console.log(result);
    })
    res.status(200).json({message: 'Publicacion Eliminada'});
});
module.exports = appprofe;
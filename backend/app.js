const express = require('express');
const bodyParser = require("body-parser");
const Post = require('./models/post');
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://LRS:LRS2000@clustersmartbooking.n9fqmlr.mongodb.net/")
.then(()=>{
    console.log("Base de datos conectada")
})
.catch(()=>{
    console.log("conexion fallida")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")

    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post ("/api/post", (req, res, next)=>{
    const post =new Post({
        name: req.body.name,
        date: req.body.date,
        time:req.body.time, 
        phoneNumber:req.body.phoneNumber,
        email:req.body.email,
        notes:req.body.notes,
        consentConfirmation:req.body.consentConfirmation,
        profesion: req.body.profesion
    });
    post.save();
    res.status(201).json({
        message: 'Post Added Succesfully'
    });
});

app.get ('/api/post',(req, res, next) =>{

  Post.find().then(documents =>{
    res.status(200).json({
        message: 'Publicaciones expuestas con exito',
        posts: documents
    });
  });
  
});
app.delete("/api/post/:id", (req, res, next)=>{
    Post.deleteOne({
        _id: req.params.id
    }).then(result =>{
        console.log(result);
    })
    res.status(200).json({message: 'Publicacion Eliminada'});
});

module.exports = app;
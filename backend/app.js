const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path")
// const { database } = require("./database/connection");
const { database } = require("./database/database");
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");

const app = express();

database
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  
  });
  // Comment.sync()
  // Like.sync()
  database.sync({ force: false }) // setea force a true para re-crear las tablas en cada inicio (en desarrollo)
     .then(() => {
         console.log('Base de datos sincronizada');
          // Inicia tu aplicación aquí
       })
    .catch(err => console.error('Error al sincronizar la base de datos:', err));


  app.use(express.json());

app.use(
    session({
      secret: 'tu_secreto',
      resave: false,
      saveUninitialized: true,
    })
  );
  
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
  app.options('/api/logout', cors());
  

  


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());

  
  app.use("/images", express.static(path.join(__dirname,"images")))
  app.use("/imagesUsers", express.static(path.join(__dirname,"imagesUsers")))
  
  app.use("/api/posts",postRoutes)
  app.use("/api/users", userRoutes );
  app.use("/api/comments", commentsRoutes );
  app.use("/api/likes", likeRoutes );
  

module.exports = app;

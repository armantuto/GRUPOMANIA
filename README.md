# GRUPOMANIA
  
  -THE APP IS ALREADY SET UP TO RUN WITH SQL SERVER MANAGEMENT STUDIO. GO TO THE DATABASE FOLDER, SELECT THE FILE databaseMSSQL.JS, AND ENTER YOUR LOCAL DATABASE DETAILS.
  -REMEMBER THAT YOU MUST HAVE SQL SERVER MANAGEMENT STUDIO INSTALLED.
  -LATER, GO TO THE MODELS FOLDER IN THE DATABASE DIRECTORY, AND IN ALL THE MODELS (COMMENTS, LIKES, POST, USERS), USE THE CONNECTION const { database } = require("../databaseMMSQL").
  -FINALLY, IN THE BACKEND FOLDER, IN THE app.js FILE, SELECT THE CONNECTION // const { database } = require("./database/databaseMMSQL"); AND UNCOMMENT THE SYNCHRONIZATION:
    // Comment.sync()
  //  Like.sync()
  // database.sync({ force: false }) // setea force a true para re-crear las tablas en cada inicio (en desarrollo)
  //    .then(() => {
  //        console.log('Base de datos sincronizada');
  //         // Inicia tu aplicación aquí
  //      })
  //   .catch(err => console.error('Error al sincronizar la base de datos:', err));
  
    -Finally, go to the front-end folder, run npm i, and then npm start. Repeat the same process for the back-end folder.


















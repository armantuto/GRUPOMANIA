# GRUPOMANIA

  "The app is configured with Sequelize locally. You just need to run 'npm i' and 'npm start' in both the frontend and backend folders."



  -You can also use SQL Management Studio in this case:
  Open SQL Management Studio and create an empty database named GRUPOMANIA (REMEMBER THAT YOU MUST HAVE SQL SERVER MANAGEMENT STUDIO INSTALLED.)
  GO TO THE DATABASE FOLDER, SELECT THE FILE databaseMSSQL.JS, AND ENTER YOUR LOCAL DATABASE DETAILS.
  -LATER, GO TO THE MODELS FOLDER IN THE DATABASE DIRECTORY, AND IN ALL THE MODELS (COMMENTS, LIKES, POST, USERS), USE THE CONNECTION const { database } = require("../databaseMMSQL").
  -FINALLY, IN THE BACKEND FOLDER, IN THE app.js FILE, SELECT THE CONNECTION // const { database } = require("./database/databaseMMSQL");
  
    -Finally, go to the front-end folder, run npm i, and then npm start. Repeat the same process for the back-end folder.


















# GRUPOMANIA

  The app is configured with Sql Lite

  to be able to run this code you will have to:

## frontend
  in your terminal:
 - run `npm install` in the frontend project folder
- run the frontend by running `npm start` in the frontend folder

## backend
in your terminal:
- run `npm install` in the backend folder
- run the backend by running `npm run start` from the backend folder.



## You can also use SQL Management Studio
   in this case:
  
  - Open SQL Management Studio and create an empty database named `GRUPOMANIA` (REMEMBER THAT YOU MUST HAVE SQL SERVER MANAGEMENT STUDIO INSTALLED.).
  - GO TO THE DATABASE FOLDER, SELECT THE FILE `databaseMSSQL.JS`, AND ENTER YOUR LOCAL DATABASE DETAILS.
  - LATER, GO TO THE MODELS FOLDER IN THE DATABASE DIRECTORY, AND IN ALL THE MODELS (COMMENTS, LIKES, POST, USERS), USE THE CONNECTION `const { database } = require("../databaseMMSQL")`.
  - FINALLY, IN THE BACKEND FOLDER, IN THE `app.js` FILE, SELECT THE CONNECTION ` const { database } = require("./database/databaseMMSQL")`;
  
    -Finally:

  ## frontend

in your terminal
- run `npm install` in the frontend project folder
- run the frontend by running `npm start` in the frontend folder

  
## backend
in your terminal

- run `npm install` in the backend folder
- run the backend by running `npm run start` from the backend folder



















const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const controller = require("../controllers/like");

//TODOS ESTAN PROTEGIDOS debo ESTART LOGGEADO
// tengo QUE PASAR EL TOKEN EN EL HEADER tipo "BEARER"


router.post("/", auth,controller.create);



module.exports = router;

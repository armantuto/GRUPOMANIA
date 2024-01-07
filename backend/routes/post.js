const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer")
const auth = require("../middleware/auth")
const controller = require("../controllers/post");

//TODOS ESTAN PROTEGIDOS debo ESTART LOGGEADO
// tengo QUE PASAR EL TOKEN EN EL HEADER tipo "BEARER"

router.get("/",auth ,controller.get);
router.get("/:id",auth ,controller.getById);
router.get("/user/:id", auth, controller.getPostOfuser)
router.post("/:id", [auth,multer],controller.create);
router.put("/:id", [auth,multer],controller.update);
router.delete("/",auth,controller.delete);


module.exports = router;

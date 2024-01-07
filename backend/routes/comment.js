const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/",  controller.get);
router.post("/:id", auth, controller.create);
router.delete("/:id", auth, controller.delete);
router.put("/:id", auth, controller.update);



module.exports = router;

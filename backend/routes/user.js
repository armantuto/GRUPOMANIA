
const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth")
const controller = require('../controllers/user')
const multerUser = require('../middleware/multerUser')

router.post('/signup', controller.signup)
router.post('/login', controller.login)

router.get("/user?", auth, controller.getUserId)
router.get("/",auth,controller.get)
router.get("/:id", auth, controller.getById)
router.put("/",[auth,multerUser], controller.update)
router.delete("/:id",auth,controller.delete)



module.exports = router
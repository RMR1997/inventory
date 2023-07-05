const express = require("express")
const router = express.Router()

const AdminController = require("../controllers/admin")
const { authToken } = require("../middleware/auth")


router.post('/login', AdminController.login)
router.post('/register', AdminController.Register)
router.get('/get', AdminController.getAllItems)
router.put('/update/:id', AdminController.editItem)
router.get('/get/:id', AdminController.getItemById)
router.post('/post', AdminController.AddItem)
router.delete('/delete/:id', AdminController.deleteItem)





module.exports = router
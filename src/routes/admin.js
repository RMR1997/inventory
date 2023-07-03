const express = require ("express")
const router = express.Router()

const AdminController = require("../controllers/admin")
const { authToken } = require("../middleware/auth")


router.post('/login',AdminController.login)
router.post('/register',authToken,AdminController.Register)
router.get('/get',AdminController.getAllItems)
router.put('/update/:id',AdminController.editItem)
router.get('/get/:id',AdminController.getItemById)
router.get('/getCategory',AdminController.getCategory)
router.get('/getOwnership',AdminController.getOwnership)
router.get('/getLocation',AdminController.getLocation)
router.post('/post',AdminController.AddItem)
router.delete('/delete/:id',AdminController.deleteItem)


module.exports = router
const express = require("express")
const router = express.Router()

const CategoryController = require("../controllers/category")

router.get('/getCategory', CategoryController.getCategory)
router.get('/getCategory/:id', CategoryController.getCategoryById)
router.post('/postCategory', CategoryController.postCategory)
router.put('/updateCategory/:id', CategoryController.putCategory)
router.delete('/deleteCategory/:id', CategoryController.deleteCategory)



module.exports = router
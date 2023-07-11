const express = require("express")
const router = express.Router()

const CodeController = require("../controllers/code")

router.get('/getCode', CodeController.getCode)
// router.get('/getLocation/:id', LocationController.getLocationById)
// router.post('/postLocation', LocationController.postLocation)
// router.put('/updateLocation/:id', LocationController.putLocation)
// router.delete('/deleteLocation/:id', LocationController.deleteLocation)



module.exports = router
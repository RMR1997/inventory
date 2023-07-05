const express = require("express")
const router = express.Router()

const LocationController = require("../controllers/location")

router.get('/getLocation', LocationController.getLocation)
router.get('/getLocation/:id', LocationController.getLocationById)
router.post('/postLocation', LocationController.postLocation)
router.put('/updateLocation/:id', LocationController.putLocation)
router.delete('/deleteLocation/:id', LocationController.deleteLocation)



module.exports = router
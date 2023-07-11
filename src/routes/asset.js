const express = require("express")
const router = express.Router()

const AssetController = require("../controllers/asset")

router.get('/getAsset', AssetController.getAsset)
// router.get('/getLocation/:id', LocationController.getLocationById)
// router.post('/postLocation', LocationController.postLocation)
// router.put('/updateLocation/:id', LocationController.putLocation)
// router.delete('/deleteLocation/:id', LocationController.deleteLocation)



module.exports = router
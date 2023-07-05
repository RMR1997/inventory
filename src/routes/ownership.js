const express = require("express")
const router = express.Router()

const ownershipController = require("../controllers/ownership")

router.get('/getOwnership', ownershipController.getOwnership)
router.get('/getOwnership/:id', ownershipController.getOwnershipById)
router.post('/postOwnership', ownershipController.PostOwnership)
router.put('/updateOwnership/:id', ownershipController.putOwnership)
router.delete('/deleteOwnership/:id', ownershipController.deleteOwnership)



module.exports = router
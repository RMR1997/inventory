const express = require("express")
const router = express.Router()

const statusController = require("../controllers/status")

router.get('/getStatus', statusController.getStatus)
router.get('/getStatus/:id', statusController.getStatusById)
router.post('/postStatus', statusController.postStatus)
router.put('/updateStatus/:id', statusController.putStatus)
router.delete('/deleteStatus/:id', statusController.deleteStatus)



module.exports = router
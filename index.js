const express = require('express')
const { where } = require('sequelize')
const app = express()
const port = 3006;
const path = require("path");
const cors = require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config()
const admin = require("./src/controllers/admin")





const adminRoutes = require("./src/routes/admin")
const ownershipRoutes = require("./src/routes/ownership")
const locationRoutes = require("./src/routes/location")
const categoryRoutes = require("./src/routes/category")
const assetRoutes = require("./src/routes/asset")

app.use('/', adminRoutes)
app.use('/', ownershipRoutes)
app.use('/', locationRoutes)
app.use('/', categoryRoutes)
app.use('/', assetRoutes)




app.listen(port, () => {
    console.log(`port ${port}`)
})


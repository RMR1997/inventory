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


app.use('/', adminRoutes)





app.listen(port, () =>{
    console.log(`port ${port}`)
})


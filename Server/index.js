const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const logger = require('morgan')
const cors = require('cors')

const movieRoute = require('./Routes/movieRoutes')

//Server
app.listen(process.env.PORT,()=>{
    `Server started on ${process.env.PORT}`
})

app.use(cors())
app.use(logger('dev'))

//Routing
app.use('/',movieRoute)


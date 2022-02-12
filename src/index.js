const express = require('express')
const cors = require('cors')
// const User=require('./model/user')
const userrouter=require('../src/router/user')
const updateprofilerouter = require('./router/updateuserprofile')
const cardetailrouter = require('../src/router/cardetails')

 const app =  express()
app.use(cors())


const port = process.env.PORT || 3000

app.use(express.json())
require('./db/mongoose.js')

// app.use(User)
app.use(updateprofilerouter)
app.use(userrouter)
app.use(cardetailrouter)





app.listen(port , () => {
    console.log('server is up on port ' + port)
})               

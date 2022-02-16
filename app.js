const express = require('express')
const morgan = require('morgan')
const ejslayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const indexRoute = require('./routes/indexRoute')
//const adminRoute = require('./routes/amdinRoute')
const connectDb = require('./config/db')

connectDb()
const app = express()


const PORT = require('./config/.env').PORT || 5000

app.use(express.static('static'));

app.use(morgan('tiny'))

app.use(bodyparser.urlencoded({extended: true}))

//ejs
app.use(ejslayouts)
app.set('view engine', 'ejs')

//routes
app.use(indexRoute)
//app.use(adminRoute)




app.listen(PORT, console.log(`server running on port ${PORT}`))
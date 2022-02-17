const express = require('express')
const morgan = require('morgan')

const bodyparser = require('body-parser')
const indexRoute = require('./routes/indexRoute')
const userRoute = require('./routes/userRoute')
const session = require('express-session');
const flash = require('connect-flash/lib/flash');
const passport = require('passport');
const connectDb = require('./config/db')

connectDb()
const app = express()

//passport
require('./config/passport')(passport)



app.use(express.static('static'));

app.use(morgan('tiny'))

app.use(bodyparser.urlencoded({extended: true}))

//ejs
app.set('view engine', 'ejs')

//session
app.use(session({
    secret : require('./config/.env').SEC,
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

app.use((req, res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})
 

//routes
app.use(indexRoute)
app.use(userRoute)

const PORT = require('./config/.env').PORT || 5000


app.listen(PORT, console.log(`server running on port ${PORT}`))
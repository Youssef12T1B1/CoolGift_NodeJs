const express = require('express')
const morgan = require('morgan')

const bodyparser = require('body-parser')
const indexRoute = require('./routes/indexRoute')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const adminRoute = require('./routes/adminRoute')
const cartRoute = require('./routes/cartRoute')
const contactRoute = require('./routes/contactRoute')

const session = require('express-session');
const flash = require('connect-flash/lib/flash');
const passport = require('passport');
const connectDb = require('./config/db')
const fileUpload = require('express-fileupload')
const expressValidator = require('express-validator')

connectDb()
const app = express()

//passport
require('./config/passport')(passport)



app.use(express.static('static'));

app.use(morgan('tiny'))

app.use(bodyparser.urlencoded({extended: true}))

// upload 
app.use(fileUpload())

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

app.get('*', (req,res,next)=>{
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null 
    next();
})
 
app.use(expressValidator({

customValidators:{
    isImage : function(value, filename){
        var extention = (path.extname(filename)).toLowerCase()
        switch(extention){
            case '.jpg':
                return '.jpg'
            case '.png':
                return '.png'
            case '':
                return 'jpg'    
            default:
                return false    
        }
    }
}
}
))

//routes
app.use(indexRoute)
app.use(userRoute)
app.use(productRoute)

app.use('/admin',adminRoute)
app.use(cartRoute)
app.use(contactRoute)
const PORT = require('./config/.env').PORT || 5000


app.listen(PORT, console.log(`server running on port ${PORT}`))
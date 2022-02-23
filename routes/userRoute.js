const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


const User = require('../models/User')

router.get('/login', (req,res)=>{

    if(res.locals.user) res.redirect('/')

    res.render('login')
})

router.get('/signup', (req,res)=>{
    if(res.locals.user) res.redirect('/')

    res.render('signup')
})
router.post('/signup', userController.signup_post )
router.post('/login', userController.login_post )

router.get('/logout', (req,res)=>{
    req.logout()
    req.flash('success_msg', 'You are logged Out')
    res.redirect('/')
})

module.exports = router
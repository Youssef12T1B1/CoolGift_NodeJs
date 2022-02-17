const User = require('../models/User')
const bcrypt = require('bcryptjs');
const passport = require('passport')


module.exports.signup_post = (req,res)=>{

    const {username, email, password, password2} = req.body
    let errors =[]
   
     if (password !== password2){
         errors.push({msg:'Password do not match'})
     }
     if (password.length < 6){
        errors.push({msg:'Password must be at least 6 characters long'})
    }
     if (errors.length>0){
         res.render('signup',{
             errors,
             username,
             email,
             password,
             password2
         })
     }
     else{
         User.findOne({email: email})
         .then(user =>{
             if(user){
                errors.push({msg:'Email is already registered'})
                res.render('signup',{
                    errors,
                    username,
                    email,
                    password,
                    password2
                })
             }else{
                const user = User({
                    username,
                    email,
                    password
                })
                bcrypt.genSalt(10, (err, salt)=>
                  bcrypt.hash(user.password,salt,(err,hash)=>{
                    if(err) throw err;
                    user.password = hash
                    user.save()
                    .then(user=>{
                        req.flash('success_msg', 'You can Login Now')
                        res.redirect('/login')
                    })
                    .catch(err=>console.log(err))
                }))

             }
         })
        }
    }   

    module.exports.login_post = (req,res, next)=>{
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect : '/login',
            failureFlash : true
        })(req, res, next)



    }    

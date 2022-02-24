const express = require('express')
const router = express.Router()
const axios = require('axios')
const Contact = require('../models/Contact')

router.get('/contact', (req,res)=>{
    res.render('contact')
})

router.post('/contact', (req,res)=>{
  

    if(!req.body){
        res.status(400).send({message:'Empty!!!'})
        return
    }
     const contact = new Contact({
         name : req.body.name,
         email : req.body.email,
         subject: req.body.subject,
         msg: req.body.msg
        
     })

     contact
      .save(contact)
      .then(data=>{
          //res.send(data)
          req.flash('success_msg','Message Send Successfully')
          res.redirect('contact')
       
      }) 
      .catch(err=>{
          res.status(500).send({
              message: err.message || 'Error Occurred while Creating user'
          })
      })

})


module.exports = router
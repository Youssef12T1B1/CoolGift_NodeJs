const express = require('express')
const router = express.Router()
const axios = require('axios')
const Product = require('../models/Product')


    
  router.get('/cart/add/:product',(req,res)=>{
    var title = req.params.product
    Product.findOne({title:title}, (err,product)=>{
      if(err)
         console.log(err);
      if(typeof req.session.cart == 'undefined'){
        req.session.cart= []
        req.session.cart.push({
          title: title,
          qty:1,
          price : parseFloat(product.price),
          Image : '/Images_Product/' + product._id + '/' + product.image
        })

      }  else{
        var cart = req.session.cart
        var newItem = true

        for(var i=0; i<cart.length;i++){
          if(cart[i].title == title){
            ++cart[i].qty
            newItem = false
            break;
          }}

          if(newItem){
            cart.push({
              title: title,
              qty:1,
              price : parseFloat(product.price),
              Image : '/Images_Product' + product._id + '/' + product.image
            })

          }
        }
      
      //console.log(req.session.cart);
      req.flash('success_msg','Product Added')
      res.redirect('back')

      })   

    })


    
 router.get('/cart/checkout',(req,res)=>{
     res.render('checkout',{
         title: 'CheckOut',
         cart: req.session.cart
     })
 })   
  


module.exports = router
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
   if(req.session.cart && req.session.cart.length == 0){
     delete req.session.cart
     res.redirect('/cart/checkout')
   }else{
       res.render('checkout',{
         title: 'CheckOut',
         cart: req.session.cart
     })
   }
   
 })   
  
 router.get('/cart/update/:product',(req,res)=>{
   var title = req.params.product
   var cart = req.session.cart
   var action = req.query.action

   for (var i =0 ; i< cart.length ; i++){
     if( cart[i].title = title){
       switch(action) {
         case 'add':
           cart[i].qty++
           break
         case 'remove':
          cart[i].qty-- 
          if(cart[i].qty <1){
            cart.splice(i, 1)

          }
          break
        case 'clear':
          cart.splice(i, 1)
          if(cart.length == 0) delete req.session.cart
          break
        default:
          console.log('update Error')
          break



       }
       break
     }

   }
   req.flash('success_msg','Cart Updated')
   res.redirect('/cart/checkout')

  
})   


router.get('/cart/clear',(req,res)=>{
 
    delete req.session.cart
    
    req.flash('success_msg','Cart Deleted Successfully')
    res.redirect('/cart/checkout')
  
})   


module.exports = router
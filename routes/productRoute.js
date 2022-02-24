const express = require('express')
const router = express.Router()
const axios = require('axios')
const Product = require('../models/Product')

router.get('/products', (req,res)=>{
    var categories 
    axios.get('http://localhost:3000/api/products/')
    .then(function(productData){
      
    axios.get('http://localhost:3000/api/categories')
    .then(function(response){
         categories  =response.data
         
         res.render('products', {products:productData.data,categories:categories})
      })
       
  
    })
    .catch(err=>{
        res.send(err)
    })
  })

  // router.get('/new_product"', (req, res)=>{
   
  //   axios.get('http://localhost:3000/api/products/')
  //   .then(function(productData){
         
  //        res.render('products', {products:productData.data})
  
  //   })
  //   .catch(err=>{
  //       res.send(err)
  //   })
  // })


  
  router.get('/product/:category', (req,res)=>{
    var categories
    var category = req.params.category

    Product.find( {category:category},function(err, products){
      
      if(err)
         console.log(err);
         axios.get('http://localhost:3000/api/categories')
         .then(function(response){
              categories  =response.data
              
              res.render('products_Category',{
                products : products,
                categories : categories
              }) 
           }) 
    })
  })

  
  
  router.get('/product/:category/:product', (req,res)=>{
    var categories
    var product = req.params.product
    var LoggedIn = (req.isAuthenticated()) ? true : false
    Product.findOne( {title:product},function(err, product){
      
      if(err)
         console.log(err);
         axios.get('http://localhost:3000/api/categories')
         .then(function(response){
              categories  =response.data
              
              res.render('product_Details',{
                product : product,
                categories : categories,
                LoggedIn : LoggedIn
          
              }) 
           }) 
    })
  })
    
  

module.exports = router
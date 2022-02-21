const express = require('express')
const router = express.Router()
const axios = require('axios')

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
  

module.exports = router
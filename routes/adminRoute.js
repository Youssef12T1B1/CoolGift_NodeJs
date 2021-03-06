const express = require('express')
const router = express.Router()
const mkdirp = require('mkdirp')
const fs = require('fs-extra')
const resize_img = require('resize-img') 
const axios = require('axios')
const Product = require('../models/Product') 
const Category = require('../models/Category')
const auth = require('../config/auth')
const ensureAuthenticated = auth.ensureAuthenticated

router.get('/add-category', ensureAuthenticated , (req,res)=>{
  res.render('admin/add-category')
})



router.get('/add-product', ensureAuthenticated, (req,res)=>{
  axios.get('http://localhost:3000/api/categories')
  .then(function(response){
      res.render('admin/add_product', {categories:response.data})
  })
  .catch(err=>{
      res.send(err)
  })
})


router.get('/products', ensureAuthenticated,(req,res)=>{
  axios.get('http://localhost:3000/api/products')
  .then(function(response){
      res.render('admin/products', {products:response.data})
  })
  .catch(err=>{
      res.send(err)
  })
})


router.get('/categories', ensureAuthenticated,(req,res)=>{
  axios.get('http://localhost:3000/api/categories')
  .then(function(response){
      res.render('admin/categories', {categories:response.data})
  })
  .catch(err=>{
      res.send(err)
  })
})

router.get('/update-category', ensureAuthenticated,(req,res)=>{
  axios.get('http://localhost:3000/api/categories/',{params:{id: req.query.id}})
  .then(function(categoryData){
      res.render('admin/update-category', {category:categoryData.data})
  })
  .catch(err=>{
      res.send(err)
  })
})

router.get('/update-product', ensureAuthenticated,(req,res)=>{
  var categories 
  axios.get('http://localhost:3000/api/products/',{params:{id: req.query.id}})
  .then(function(productData){
    
  axios.get('http://localhost:3000/api/categories')
  .then(function(response){
       categories  =response.data
       
       res.render('admin/update-product', {product:productData.data,categories:categories})
    })
     

  })
  .catch(err=>{
      res.send(err)
  })
})


module.exports = router
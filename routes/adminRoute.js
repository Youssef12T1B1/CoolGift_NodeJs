const express = require('express')
const router = express.Router()
const mkdirp = require('mkdirp')
const fs = require('fs-extra')
const resize_img= require('resize-img') 
const axios = require('axios')


router.get('/add-category', (req,res)=>{
  res.render('admin/add-category')
})
router.get('/add-product',(req,res)=>{
  res.render('admin/add_product')

})


router.get('/categories', (req,res)=>{
  axios.get('http://localhost:3000/api/categories')
  .then(function(response){
      res.render('admin/categories', {categories:response.data})
  })
  .catch(err=>{
      res.send(err)
  })
})

router.get('/update-category', (req,res)=>{
  axios.get('http://localhost:3000/api/categories/',{params:{id: req.query.id}})
  .then(function(categoryData){
      res.render('admin/update-category', {category:categoryData.data})
  })
  .catch(err=>{
      res.send(err)
  })
})



module.exports = router
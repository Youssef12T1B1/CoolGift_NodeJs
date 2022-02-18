const { redirect } = require('express/lib/response')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports.create_category = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'Empty!!!'})
        return
    }
     const category = new Category({
         title : req.body.title,
         description : req.body.description,
        
     })

    category
      .save(category)
      .then(data=>{
          //res.send(data)
          res.redirect('/admin/add-category')
      }) 
      .catch(err=>{
          res.status(500).send({
              message: err.message || 'Error Occurred while Creating user'
          })
      })
}

module.exports.create_product = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'Empty!!!'})
        return
    }
     const product = new Product({
         title : req.body.title,
         description : req.body.description,
        
     })

    product
      .save(category)
      .then(data=>{
          //res.send(data)
          res.redirect('/admin/add-product')
      }) 
      .catch(err=>{
          res.status(500).send({
              message: err.message || 'Error Occurred while Creating user'
          })
      })
}

module.exports.findCat = (req,res)=>{
    if(req.query.id){
        const id=req.query.id
         Category.findById(id)
         .then(data=>{
             if(!data){
                res.status(404).send({message:'category not found'})

             }else{
                res.send(data)
             }
            
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Error Occurred while retriving user information'
            })
        })


    }else{
    Category.find()
    .then(category=>{
        res.send(category)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || 'Error Occurred while retriving users information'
        })
    })
}

}
module.exports.update_category = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'Empty!!!'})
        return
    }
    const id = req.params.id
    Category.findByIdAndUpdate(id,req.body, {useFindAndModify: false})
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Update category ${id}`})
           }else{
               res.send(data)
              
           }
       })
       .catch(err=>{
        res.status(500).send({message:'Error Update category'})
       })

}
module.exports.delete_category = (req,res)=>{

    const id = req.params.id
    Category.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
               res.status(404).send({message:`Cannot delete Category ${id}`})
           }
           else{
               res.send({message: 'Category was deleted Successfully' })

           }
       })
       .catch (err=>{
           res.status(500).send({message:'could not delete Category'})
       })
}

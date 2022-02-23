const { redirect } = require('express/lib/response')
const { fstat } = require('fs-extra')
var mkdir = require('mkdirp')
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

  if(!req.files){imageFile = ""}
     else{
        var imageFile = typeof(req.files.image) !== "undefined" ? req.files.image.name : ""
    }
  req.checkBody('image', 'image is not valid').isImage(imageFile); 


  var price = parseFloat(req.body.price).toFixed(2)
     const product = new Product({

         title : req.body.title,
         price : price,
         description : req.body.description,
         image : imageFile,
         category : req.body.category,

     })

    product
      .save(product)
      .then(data=>{
        mkdir('static/Images_Product/'+product._id ,(function(err){
              return console.log(err);
          }))
          mkdir('static/Images_Product/'+product._id + '/gallery',(function(err){
            return console.log(err);
        }))
        mkdir('static/Images_Product/'+product._id + '/gallery/thumbs',(function(err){
            return console.log(err);
        }))

        if(imageFile != ""){
            var productImage = req.files.image
            var path = 'static/Images_Product/'+product._id+ '/'+ imageFile
            productImage.mv(path, function(err){

                return console.log(err);
            })

        }
       


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


module.exports.findPro = (req,res)=>{
    if(req.query.id){
        const id=req.query.id
         Product.findById(id)
         .then(data=>{
             if(!data){
                res.status(404).send({message:'Product not found'})

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
    Product.find()
    .then(product=>{
        res.send(product)
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || 'Error Occurred while retriving users information'
        })
    })
}}

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

module.exports.update_product = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'Empty!!!'})
        return
    }
    const id = req.params.id
    Product.findByIdAndUpdate(id,req.body, {useFindAndModify: false})
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Update product ${id}`})
           }else{
            // // var galleryDir = 'static/Images_Product/' + id+ '/gallery';
            // // var galleryImages = null;
            // // fs.readdir(galleryDir, function(err,files){
            // //         if(err){
            // //             console.log(err);
            // //         }else{
            // //             galleryImages = files
            // //         }
            // })
               res.send(data)
              
           }
       })
       .catch(err=>{
        res.status(500).send({message:'Error Update product'})
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

module.exports.delete_product = (req,res)=>{

    const id = req.params.id
    Product.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
               res.status(404).send({message:`Cannot delete Product ${id}`})
           }
           else{
               res.send({message: 'Product was deleted Successfully' })

           }
       })
       .catch (err=>{
           res.status(500).send({message:'could not delete Product'})
       })
}

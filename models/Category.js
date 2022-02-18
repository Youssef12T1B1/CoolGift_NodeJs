const mongoose = require('mongoose')



const categorySchema = new mongoose.Schema({
    title :{
         type: String,
        
    },
  
    description : {
        type: String, 
    }
     
},{ timestamps: true}); 





const Category = mongoose.model('category', categorySchema);

module.exports= Category
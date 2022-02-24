const mongoose = require('mongoose')



const ContactSchema = new mongoose.Schema({
    name :{
         type: String,
         required: true,
         lowercase: true
    },
    email : {
        type: String,
        required: true,
       
        lowercase: true,
        

    },
    subject : {
        type: String,
    
    },
    msg :{
        type: String
    }    
     
},{ timestamps: true}); 





const Contact = mongoose.model('contact', ContactSchema);

module.exports= Contact
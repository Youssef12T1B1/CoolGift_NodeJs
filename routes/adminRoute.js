const express = require('express')
const router = express.Router()



router.get('/add-page', (req,res)=>{
    var title= ""
    var slug=""
    var content=""

    res.render('admin/add-page',{
        title: title,
        slug: slug,
        content: content

    })

})


module.exports = router
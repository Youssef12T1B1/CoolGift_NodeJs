const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

router.get('/', (req,res)=>{
    res.render('index')
})

router.post('/api/categories', adminController.create_category)
router.put('/api/categories/:id', adminController.update_category)
router.get('/api/categories', adminController.findCat)
router.delete('/api/categories/:id', adminController.delete_category)


router.post('/api/products', adminController.create_product)
 router.put('/api/products/:id', adminController.update_product)
router.get('/api/products', adminController.findPro)
router.delete('/api/products/:id', adminController.delete_product)

module.exports = router
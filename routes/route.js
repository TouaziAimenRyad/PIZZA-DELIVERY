const controller =require('../controllers/controller')

const express = require('express');

const router=express.Router()
router.get('/', controller.get_all_menu_items)
router.post('/add_to_cart',controller.add_to_cart)
router.post('/delete_from_cart',controller.delete_from_cart) //delete request is not safe 
router.get('/menu_item/:nom',controller.item_detaill)

module.exports=router
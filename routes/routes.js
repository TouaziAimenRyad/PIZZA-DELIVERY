const controller =require('../controllers/controller')

const express = require('express');

const router=express.Router()
router.get('/', controller.get_all_menu_items)
router.get('/get-cart',controller.get_cart)
router.post('/add_pizza_to_cart',controller.add_pizza_to_cart)
router.post('/add_boisson_to_cart',controller.add_boisson_to_cart)
router.post('/add_entree_to_cart',controller.add_entree_to_cart)
router.post('/add_pizza_perso',controller.add_perso_pizza_to_cart)
router.post('/add_pre_menu',controller.add_menu_to_cart)
router.post('/delete_from_cart',controller.delete_from_cart) //delete request is not safe 
router.post('/commander',controller.commander)
router.get('/menu_item/:nom',controller.item_detaill)

module.exports=router
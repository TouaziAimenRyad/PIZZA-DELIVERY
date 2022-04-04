const controller =require('../controllers/controller')

const express = require('express');

const router=express.Router()
router.get('/', controller.get_all_menu_items)

module.exports=router
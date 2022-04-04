const controller =require('../controllers/controller')

const express = require('express');

const router=express.Router()
router.get('/', controller.get_menu)

module.exports=router
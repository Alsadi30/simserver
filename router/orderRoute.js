const router = require('express').Router()
const {isUser} = require('../validator/isUser')
const { getAllOrders,createOrder,updateOrder,deleteOrder, getOrdersById } = require('../controller/orderController')
const { isAdmin } = require('../validator/isAdmin')
const passport = require('passport')



router.get('/nonac', isUser, isAdmin, getAllOrders)

router.get('/:id', isUser, getOrdersById)

router.post('/create', passport.authenticate('jwt', { session: false }), isUser, createOrder)

router.post('/update/:id',isAdmin, updateOrder)

router.delete('/delete/:id',isAdmin, deleteOrder)

module.exports = router
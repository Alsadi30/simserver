const router = require('express').Router()
const User = require('../models/User')
const Order = require('../models/Order')
const { getAllOrders } = require('../controller/orderController')




router.get('/',getAllOrders)


module.exports = router
const router            = require('express').Router()
const { getAllOffers }  = require('../controller/offerController')




router.get('/', getAllOffers)


module.exports = router
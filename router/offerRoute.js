const router = require('express').Router()
const { getAllOffers, createOffer, deleteOffer }  = require('../controller/offerController')
const { isAdmin } = require('../validator/isAdmin')
const passport = require('passport')
const { isUser } = require('../validator/isUser')



router.get('/',isUser, getAllOffers)

router.post('/create',isUser,isAdmin, createOffer)

router.delete('/delete/:id',isUser , isAdmin, deleteOffer)


module.exports = router
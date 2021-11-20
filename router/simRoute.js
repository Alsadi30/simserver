const router = require('express').Router()
const Sim = require('../models/Sim')
const User = require('../models/User')
const passport = require('passport')
const {simCreateController, getSimController} = require('../controller/simController')
const { isUser } = require('../validator/isUser')

router.get('/',passport.authenticate('jwt', { session: false }), isUser , getSimController)

router.post('/create',simCreateController)



module.exports = router
const router = require('express').Router()
const passport = require('passport')
const {simCreateController, getSimController,getSimbyParams, updateActiveSim} = require('../controller/simController')
const { isUser } = require('../validator/isUser')
const { isAdmin } = require('../validator/isAdmin')


router.get('/',passport.authenticate('jwt', { session: false }),isUser , getSimController)

router.get('/:id',isUser, isAdmin,getSimbyParams)


router.post('/create' ,isUser,isAdmin,simCreateController)

router.post('/update/:id' ,isUser,isAdmin,updateActiveSim)


module.exports = router
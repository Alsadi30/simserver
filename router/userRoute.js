const router = require('express').Router()
const User = require('../models/User')
const {signupController,login, getAllUserController, updateUser} = require('../controller/userController')
const { loginValidator } = require('../validator/loginValidator')
const passport = require('passport')
const { ResultWithContext } = require('express-validator/src/chain')
const Order = require('../models/Order')
const { isUser } = require('../validator/isUser')


router.get('/',isUser, getAllUserController)

router.post('/create', signupController)

router.post('/login',login)

router.put(`/:id` , isUser , updateUser)

router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.send("ok")
    User.destroy({
        where: {
            name: "ss"
          }
    }).then((user) => {console.log('deleted' + user)})
    .catch(err=>console.log("Error  "+err))
})

module.exports = router
const router = require('express').Router()
const Admin = require('../models/Admin')
const {adminSignupController, adminLoginController} = require('../controller/adminController')

const passport = require('passport')



router.get('/', (req, res) => {
   
})

router.post('/create', adminSignupController)

router.post('/login',adminLoginController)


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
const router = require('express').Router()
const {adminSignupController, adminLoginController} = require('../controller/adminController')
const {loginValidator}        = require('../validator/loginValidator')
const { isAdmin } = require('../validator/isAdmin')



router.get('/', (req, res) => {
   
})

router.post('/create', adminSignupController)

router.post('/login',loginValidator, adminLoginController )


// router.delete('/delete',isAdmin, (req, res) => {

//     Adimin.destroy({
//         where: {
//             name: "ss"
//           }
//     }).then((user) => {console.log('deleted' + user)})
//     .catch(err=>console.log("Error  "+err))
// })

module.exports = router
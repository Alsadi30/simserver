const router = require('express').Router()
const User = require('../models/User')
const {signupController,login, getAllUserController,getNonActiveUserContorller, updateUser} = require('../controller/userController')
const { loginValidator } = require('../validator/loginValidator')
const passport = require('passport')
const { isUser } = require('../validator/isUser')
const { isAdmin } = require('../validator/isAdmin')


router.get('/', isAdmin, getAllUserController)

router.get('/nonactive',isAdmin, getNonActiveUserContorller)

router.post('/create', signupController)

router.post('/login',loginValidator, login)

router.put(`/:id` , isAdmin , updateUser)

router.delete('/:id',isUser,isAdmin, async (req, res) => {
 
    let { id } = req.params
    
  try {
    let user = await User.destroy({
      where: {
          id 
        }
})
  res.status(204).json({user})
  } catch (e) {
    console.log(e)
    res.status(500).json({e})
  }  
    
})

module.exports = router
const {check} = require('express-validator')

exports.loginValidator = [
    check('name')
     .notEmpty()
     .withMessage("Name Can Not be empty"),
     
    check('password')
         .notEmpty()
         .withMessage("password Can Not be Empty") 
         .isLength({min:6})
         .withMessage('password cannot be less than 6 chars ')
         
] 

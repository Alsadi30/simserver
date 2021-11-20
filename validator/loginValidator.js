const {body} = require('express-validator')

exports.loginValidator = [
    body('name')
     .isEmpty()
     .withMessage("Name Can Not be empty"),
     
    body('password')
         .not()
         .isEmpty()
         .withMessage("password Can Not be Empty") 
         .isLength({min:6})
         .withMessage('password cannot be less than 6 chars ')
         
] 

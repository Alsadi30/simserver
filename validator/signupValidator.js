const validator   = require('validator')

const validate = user =>{
    let error = {}

    if(!user.name){
        error.name='Please Provide Your Name'
    }
    if(!user.email){
        error.email='Please Provide Your Email'
    }else if (!validator.isEmail(user.email)){
        error.email='Please Provide Your Mail'
    }

    if(!user.password){
        error.password = 'Please Provide Your Password'
    }else if (user.password.length < 6){
        error.password = 'Your Password Must Be UpTp 6 Chars'
    }

    if(!user.confirmPassword){
        error.confirmPassword = 'Please Provide Your ConfirmPassword'
    }else if (user.password !== user.confirmPassword){
        error.confirmPassword = 'Password doesn\'t Match'
    }


    return {
        error,
        isValid : Object.keys(error).length === 0
    }

}

module.exports = validate
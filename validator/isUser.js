const  jwt = require('jsonwebtoken')
const SECRET = process.env.USERSECRET

exports.isUser = async (req,res,next) => {
    try{
        const token = req.headers?.authorization.split(" ")[1]
        
        if(!token) res.status(400).json({msg:'you are not even a user'})
        let decodedData 

        if (token) {
            decodedData = jwt.verify(token, SECRET)
            req.userID = decodedData?.id;        
            next()
        }
           
    }catch(error){
       console.log(error)
    }
}
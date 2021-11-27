const jwtDecode = require('jwt-decode')
let ADSECRET = process.env.SECRET


exports.isAdmin = async (req,res,next) => {
    try{
        const token = req.headers?.authorization.split(" ")[1]
        
        if(!token) res.status(400).json({msg:'you are not even a user'})
        let decodedData 

        if (token) {
            decodedData = jwtDecode(token)

            if (decodedData.name === ADSECRET) {
                next()
            } else {
                res.status(400).json({msg:'you are not an admin'})
            }
            
           
        }
           
    }catch(error){
       console.log(error)
    }
}
const  Sim = require("../models/Sim")
const User =  require("../models/User")




exports.simCreateController = async (req, res) => {
    try {
        let {username,simNumber,Operator,cost,orderedAt,ICCID} = req.body
  

    let user = await User.findOne({where: { name:username }})
    
    if (!user) res.send('User not found')

    let createdSim = await Sim.create({
        operatorName: Operator,
        ICCID,
        simNumber,
        cost,
        orderedAt,
        userId:user.id,
    })

    res.status(200).json({createdSim})
    } catch(e){
        console.log(e)
        res.status(500).json({msg:'server problem'})
    }
    

}


exports.getSimController = async (req, res) => {
    
    let userID = req.userID

    try {
        let allSim = await Sim.findAll({ where: { userId: userID } })
    
        res.status(201).json({allSim})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({e})
    }

}
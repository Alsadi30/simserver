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
        res.status(500).json({e})
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

exports.getSimbyParams = async (req,res) => {
    
    let { id } = req.params
    
    try {
        let sims = await Sim.findAll({ where: { userId: id } })
    
        res.status(201).json({sims})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({e})
    }


}


exports.updateActiveSim = async (req, res) => {

    let { id } = req.params
    let { comment } = req.body   
    console.log(req.body)
    console.log(comment)    
    try {
        let updatedSim = await Sim.update({ approvalStatus: true,activatedAt:Date.now(),comment }, { where: {id:id} })
        
        res.status(201).json({updatedSim})
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
    
}

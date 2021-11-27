const User = require('../models/User')
const Order = require('../models/Order')





exports.getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.findAll({ include: [ { model: User, as: 'user' } ] },{where: {status: false } });

        res.json({orders}).status(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}


exports.getOrdersById = async (req, res) => {

    let {id} = req.params
    try {
        const orders = await Order.findAll({where:{userId:id}});
        res.json({orders}).status(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
}
    
}





exports.createOrder = async (req, res) => {

    
    let userId = req.userID

    let { companyName, numberOfproduct } = req.body
    
    try {
        
        let createdOrder = await Order.create({ companyName,numberOfproduct,userId })
        
        res.status(201).json({createdOrder})

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
    

}


exports.updateOrder = async (req, res) => {
    let { id } = req.params
    
    try {
        
        let updatedOne = await Order.update({status:true},{
            where:{id}
        })

        res.status(201).json({updatedOne})

    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }


}


exports.deleteOrder = async (req, res) => {
    let { id } = req.params
    
    try {
        
        let del = await Order.destroy({
            where:{id}
        })

        res.status(204).json({del})

    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }


}
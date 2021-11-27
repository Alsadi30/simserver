const User = require('../models/User')
const Offer = require('../models/Offer')





exports.getAllOffers = async (req, res) => {
 
    try {
        const offers = await Offer.findAll();
        res.json({offers}).status(200)
    } catch (e) {
        res.status(500).json({e})
    }
}


exports.createOffer = async (req, res) => {

    let { title, operatorName } = req.body
    
    try {
        
        let createdOffer = await Offer.create({ title, operatorName })
        
        res.status(201).json({createdOffer})

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
    

}

exports.deleteOffer = async (req, res) => {
    let { id } = req.params
    
    try {
        
        let del = await Offer.destroy({
            where:{id}
        })

        res.status(204).json({del})

    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }


}
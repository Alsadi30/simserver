const User = require('../models/User')
const Offer = require('../models/Offer')





exports.getAllOffers = async (req, res) => {
    const offers = await Offer.findAll();
    res.json({message: 'ok'}).status(200)
}
const Order = require('../models/Order');





exports.getAllOrders = async (req, res) => {
    const offers = await Order.findAll();
    res.json({message: 'ok'}).status(200)
}
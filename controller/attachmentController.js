const Attachment = require('../models/Attachment')
const Sim = require('../models/Sim')


exports.getAllAttachmentController = async (req, res) => {
    
    try {
        let attachment = await Attachment.findAll({ include: [ { model: Sim, as: 'sim' } ] })
      
       console.log(attachment)
        res.status(201).json(attachment)
    } catch (error) {
        res.status(500).json({e})
    }
}
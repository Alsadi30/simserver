const Attachment = require('../models/Attachment')
const Sim = require('../models/Sim')
const User = require('../models/User')
const {unlink} = require('fs')


exports.getAllAttachmentController = async (req, res) => {
    
    try {
        let attachment = await Attachment.findAll({ include: [ { model: Sim, as: 'sim',include:[{model:User,as: 'user'}] }, ] })
      
        res.status(201).json(attachment)
    } catch (error) {
        res.status(500).json({e})
    }
}











exports.deleteAttachment = async (req, res) => {
    let { id } = req.params
    
    try {
        let attachment = await Attachment.findOne({ where: { id } })

        if (attachment.dataValues.file_1) {
            unlink(`public/wordfile/${attachment.dataValues.file_1}`, (err) => {
            if (err) throw err;
            console.log(`${attachment.dataValues.file_1} deleted` );
          });
        }
        
        if (attachment.dataValues.file_2) {
            unlink(`public/uploads/${attachment.dataValues.file_2}`, (err) => {
            if (err) throw err;
            console.log(`${attachment.dataValues.file_2} deleted` );
          });
        }
        if (attachment.dataValues.file_3) {
            unlink(`public/uploads/${attachment.dataValues.file_3}`, (err) => {
            if (err) throw err;
            console.log(`${attachment.dataValues.file_3} deleted` );
          });
        }
        if (attachment.dataValues.file_4) {
            unlink(`public/uploads/${attachment.dataValues.file_4}`, (err) => {
            if (err) throw err;
            console.log(`${attachment.dataValues.file_4} deleted` );
          });
        }
        
        if (attachment.dataValues.file_5) {
            unlink(`public/uploads/${attachment.dataValues.file_5}`, (err) => {
                if (err) throw err;
                console.log(`${attachment.dataValues.file_5} deleted`);
            });

        }

    
        let deletedAttachment = await Attachment.destroy({ where: { id } })
    
        res.status(204).json({deletedAttachment})
       
    } catch (e) {
        res.status(500).json({e})
    }
    
}
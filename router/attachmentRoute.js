const router = require('express').Router()
const Sim = require('../models/Sim')
const Attachment = require('../models/Attachment');
const upload = require('../middleware/multer');
const fs = require('fs');
const { getAllAttachmentController, deleteAttachment } = require('../controller/attachmentController')
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const passport = require('passport')
const { isAdmin } = require('../validator/isAdmin');
const { isUser } = require('../validator/isUser');



router.get('/',isUser,isAdmin, getAllAttachmentController)

router.post(`/:id`, isUser, upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 },{ name: 'file4', maxCount: 1 }]), async (req, res) => {
    
    let {id} = req.params
   
    let moSim = await Sim.findOne({ where: { id } })


    let { clientfirstname,clientlastname, codicifiscale, sendingNumber, ricarica, salesPrice, Operator, ICCID, simNumber, note,Bill } = req.body
    
    console.log(Bill)

    // let fileName = req.file.filename

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: `
                    Client First Name : ${clientfirstname}
                    Client Last Name : ${clientlastname}
                    New ICCID: ${moSim.dataValues.ICCID}
                    New Sim Number : ${moSim.dataValues.simNumber}
                    New Sim Operator : ${moSim.dataValues.operatorName}                              
                    Codicifiscale : ${codicifiscale}                                              
                    Sending Number : ${sendingNumber}                           
                    Ricarica : ${ricarica}                                      
                    Sale Price : ${salesPrice}                                  
                    MNP Operator : ${Operator}                                  
                    MNP ICCID : ${ICCID}                                        
                    MNP Phone Number : ${simNumber}
                    MNP Bill: ${Bill}                            
                    note: ${note}                                           
                    `,
                    spacing: {
                        line: 300,
                    },
                    heading: HeadingLevel.HEADING_1,
                }),
            ],
        }],
    });
    

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`public/wordfile/${id}${clientfirstname}.docx`, buffer);
    })
    .catch(e=>console.log(e))
    

    let file2 = !!req.files.file1 ? req.files.file1[0].filename : null
    let file3 = !!req.files.file2 ? req.files.file2[0].filename : null
    let file4 = !!req.files.file3 ? req.files.file3[0].filename : null
    let file5 = !!req.files.file4 ? req.files.file4[0].filename : null

    console.log(file2)

    try {
    
        let file = await Attachment.create({
            file_1: `${id}${clientfirstname}.docx`,
            file_2: file2,
            file_3: file3,
            file_4: file4,
            file_5: file5,
            simId: id
        })
       
        let sim = await Sim.update({ saleStatus: true, soldAt: Date.now() }, { where: { id: id } })
        
        res.status(201).json({file})
    }
        catch (e) {
            console.log(e)
            res.status(500).json({e})
        }


    
    
})





router.delete('/:id',isUser,isAdmin, deleteAttachment )


module.exports = router
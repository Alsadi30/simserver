const router = require('express').Router()
const passport = require('passport')
const {simCreateController, getSimController,getSimbyParams, updateActiveSim} = require('../controller/simController')
const { isUser } = require('../validator/isUser')
const { isAdmin } = require('../validator/isAdmin')
const Sim = require('../models/Sim')

router.get('/',passport.authenticate('jwt', { session: false }),isUser , getSimController)

router.get('/:id',isUser, isAdmin,getSimbyParams)


router.post('/create' ,isUser,isAdmin,simCreateController)

router.post('/update/:id' ,isUser,isAdmin,updateActiveSim)

router.delete('/delete/:iccid' ,isUser,isAdmin, async (req, res) => {
   
    let { iccid } = req.params
    
    try {
        
        let del = await Sim.destroy({
            where:{ICCID:iccid}
        })

        res.status(203).json("sim successfully deleted ")

    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }


})



module.exports = router

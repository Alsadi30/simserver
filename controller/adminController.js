const signupValidator         = require('../validator/signupValidator')
const Admin                   = require('../models/Admin')
const bcrypt                  = require('bcrypt')
const errorFormater           = require('../utils/errorFormater')
const { validationResult }    = require('express-validator')
const jwt                     = require('jsonwebtoken');



exports.adminSignupController = async (req, res) => {
    let {
        name,
        email,
        password,
        confirmPassword
    } = req.body

    let validate = signupValidator({
        name,
        email,
        password,
        confirmPassword
    })

    if (!validate.isValid) {
        res.status(400).json(validate.error)
    } else {

        try {
            let user = await Admin.findOne({ where: { email } })
            
            if (user) {
                return res.status(400).json({
                    message: "Email Already Exist"
                })
            }

            let hashPassword = await bcrypt.hash(password, 11)
            try {
                let signedUser = await Admin.create({
                    name,
                    email,
                    password: hashPassword,
                })
    
                res.status(200).json({
                    message: "User Created Successfully",
                    signedUser
                })
            } catch (e) {
                console.log(e)
                res.status(500).json({
                    message: 'saving problem'
                })
            }
           

        } catch {
            e => {
                console.log(e)
                res.status(500).json({
                    message: 'Server Error Occurred server not found'
                })
            }
        }
    }
}



exports.adminLoginController = async (req, res) => {
    console.log(req.body.name)

    let {
        name,
        password
    } = req.body


    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        res.status(404).json({
            error:errors.mapped(),
            message: "Admin not found"
        })
    }

    try {
        let user = await Admin.findOne({
           where: {name}
        })

        if (!user) {
            res.status(400).json({
                message: "users not found"
            })
        }

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            res.status(402).json({
                message: "password doesnot match"
            })
        }
        if (match) {
            let token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, 'SECRET', {
                expiresIn: '2h'
            })

            res.status(200).json({
                    message: "Successfully login",
                    token: `Bearer ${token}`

                })

            


        }

    } catch (e) {
        res.status(500).json({
            message: e
        })
        console.log(e)
    }



}
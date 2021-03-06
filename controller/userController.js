const signupValidator = require('../validator/signupValidator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const errorFormater = require('../utils/errorFormater')

const {
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken');
const SECRET = process.env.USERSECRET










exports.signupController = async (req, res) => {
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
            let user = await User.findOne({ where: { email } })
            
            if (user) {
                return res.status(400).json({
                    message: "Email Already Exist"
                })
            }

            let hashPassword = await bcrypt.hash(password, 11)
            try {
                let signedUser = await User.create({
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









exports.login = async (req, res) => {
    console.log(req.body.name)

    let {
        name,
        password
    } = req.body


    let errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        res.status(404).json({
            error:errors.mapped(),
            message: "Please Provide Valid Credentials"
        })
    }

    try {
        let user = await User.findOne({
           where: {name}
        })

        if (!user) {
            res.status(400).json({
                message: "Please Provide Valid Credentials"
            })
        }

        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            res.status(402).json({
                message: "Please Provide Valid Credentials"
            })
        }
        if (match) {
            let token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, SECRET, {
                expiresIn: '16h'
            })

            res.status(200).json({
                    message: "Successfully login",
                token: `Bearer ${token}`,
                isActive: user.isActive

                })
        }

    } catch (e) {
        res.status(500).json({
            message: 'Server Error Occured'
        })
        console.log(e)
        
    }



}


exports.getAllUserController = async (req, res) => {
    try {
        let users = await User.findAll()

        res.status(201).json({users})
        
    } catch (e) {
       res.status(500).json({e})
    }
}


exports.getNonActiveUserContorller = async (req, res) => {
    try {
        let users = await User.findAll({ where:{isActive:false}})

        res.status(201).json({users})
        
    } catch (e) {
       res.status(500).json({e})
    }
}
    

exports.updateUser = async (req, res) => {
    let {id} = req.params
   
    try {
        let user = await User.update({ isActive: true }, { where: { id } })
        console.log(user)
        if (!user) res.json({ msg: 'user not found' })
       

    
        res.status(201).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
   }
    
}
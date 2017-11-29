const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = function (res, dbErrors){
    const errors = []
    _.forIn(dbErrors.errors, function(error){
        errors.push(error.message)
        return res.status(400).json({errors})
    })
}

const login = function(req, res, next){
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({email}, function (err, user){
        if(err){
            return sendErrorsFromDB(res, err)
            
        }else if(user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(user, env.authSecret,{
                expiresIn: "1 day"
               //expiresIn: "10 seconds"
            })
            const {name, email} = user
            res.json({name, email, token})
        }else{
            return res.status(400).send({errors: ['Usuário/Senha invalidos']})
        }
    })    
}

const validateToken = function(req ,res, next){
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded){
        return res.status(200).send({valid: !err})
    })
}

const signup = function(req, res, next){
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    if(!email.match(emailRegex)){
        return res.status(400).send({errors:['O e-mail informado está invalido'] })
    }
   
    if(!password.match(passwordRegex)){
         console.log(req.body.password,req.body.confirm_password,!password.match(passwordRegex))
        return res.status(400).send({errors: [
            "Senha Precisa ter: uma letra Maíuscula, uma letra minúscula, um numero, um caractere especial(@#$%) e tamanho entre 6-12."
        ]})
    }



    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }


    User.findOne({ email }, function (err, user) {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(function(err){
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }
    })

}

module.exports = {login, signup, validateToken}
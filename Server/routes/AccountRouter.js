const express= require('express')
const app = express.Router()
const jwt = require('jsonwebtoken');

const AccountController = require('../controllers/AccountController')
const AccountMiddleware = require('../middlewares/AccountMiddleware')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))


app.post('/login', AccountMiddleware.InputLogin, AccountController.Login);



app.post('/register',AccountMiddleware.InputRegister, AccountController.Register)


app.post('/testToken', async(req, res)=>{
    let {token} = req.body
    //console.log("Token: ", token);
    const secretKey = 'token-login-account';

    // let data= await jwt.verify(token, secretKey)
    jwt.verify(token, secretKey, (err, data) => {
        if (err) 
            return res.json({
                code: 301,
                message: "Failed Check Token"
            });

        return res.json({
            code: 200,
            message: "success",
            data: data
        })
    })
  
})
module.exports = app
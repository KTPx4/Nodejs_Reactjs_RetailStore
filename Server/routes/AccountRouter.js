const express= require('express')
const app = express.Router()
const jwt = require('jsonwebtoken');

//controller
const AccountController = require('../controllers/AccountController')
// middleware
const AccountValidator = require('../middlewares/Account/Validator')
const Auth = require('../middlewares/Account/Auth')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', AccountController.GetAll)

app.get('/active',AccountValidator.InputActive,  AccountController.Active)

app.post('/login', AccountValidator.InputLogin, AccountController.Login);

app.post('/register',AccountValidator.InputRegister, AccountController.Register)


app.post('/changepassword',Auth.AuthAccount, AccountValidator.InputChangePass, AccountController.ChangePassword)

app.post('/sendactive', Auth.AuthRoleAmin, AccountValidator.InputSendAcitve, AccountController.CreateActive)

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
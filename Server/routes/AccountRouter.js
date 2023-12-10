const express= require('express')
const app = express.Router()
const jwt = require('jsonwebtoken');

const multer = require('multer')

//controller
const AccountController = require('../controllers/AccountController')
// middleware
const AccountValidator = require('../middlewares/Account/Validator')
const Auth = require('../middlewares/Account/Auth')

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended: true}))


// Khi Đăng nhập đã gửi đầy đủ thông tin có thể được tương tác qua token cho user rồi nên không viết api cho user lấy profile nửa
app.get('/', Auth.AuthRoleAmin, AccountController.GetAll)
app.get('/profile/:id',  Auth.AuthRoleAmin, AccountController.GetProfileByID) // Dùng Cho Admin khi load dashboard


app.get('/active', AccountValidator.InputActive,  AccountController.Active)

app.post('/login', AccountValidator.InputLogin, AccountController.Login);
app.get('/login', AccountController.VerifyLogin) // verify token login 

app.post('/register',  Auth.AuthRoleAmin, AccountValidator.InputRegister, AccountController.Register)

app.post('/changepassword', Auth.AuthAccount, AccountValidator.InputChangePass, AccountController.ChangePassword)

app.post('/sendactive', Auth.AuthRoleAmin, AccountValidator.InputSendAcitve, AccountController.CreateActive)
app.post('/setstatus', Auth.AuthRoleAmin, AccountValidator.InputSendAcitve, AccountController.SetStatus)

module.exports = (root) =>{

    const uploader = multer({dest: root +'/uploads/'})

    app.put('/profile', uploader.single('avt'), Auth.AuthAccount, AccountValidator.UpdateProfile,  AccountController.UpdateProfile)
    
    return app
}



/*
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
*/


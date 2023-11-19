const AccountModel = require('../models/AccountModel')
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_LOGIN_ACCOUNT || 'token-login-account';
const secretActive = process.env.TOKEN_ACTIVE_ACCOUNT || 'token-active-account';
const { sendTestEmail } = require("../modules/mailer");


// "web": {
//     "client_id": "250216999612-tdm2kc049htftb9utdi0fnh0fmbu3q1v.apps.googleusercontent.com",
//     "project_id": "finalnodejs-405607",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_secret": "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",
//     "redirect_uris": [
//         "https://developers.google.com/oauthplayground/"
//     ]
// }


module.exports.GetAll = async(req, res) =>{
    const account = await AccountModel.find();
    res.json({
        code: 200,
        message: "Get All Account Success!",
        data: account
    })
}

module.exports.Login = async(req, res) =>{
    
    let {name} = req.body 
  //  console.log("name" ,name);
    

    // find db
    const account = await AccountModel.findOne({
        Name: name
    })

    if(account)
    {
       
        
        return res.json({
            code: 200,
            message: "Login Success",
            data: token
        })
    }
  
    return res.json({
        code: 300,
        message: "Login Failed",
        data: []
    })

}

module.exports.Register = async(req, res)=>{
    let {email, fullName} = req.body
    console.log("email:::: ", email);

    var account = await FindByEmail(email)

    
    if(account)
    {
        return res.json({
            code: 303,
            message: "Email đã tồn tại"
        })
    }

    let UserName = email.split("@")[0];
    let Password = UserName

    try{

        const Account = await AccountModel.create({
            fullName: fullName,
            Email: email,
            Password: Password || '12345',
            User: UserName || email
        });

     
        const data = JSON.parse(JSON.stringify(Account));


        const expiresIn = '1m';
        const token = jwt.sign(data, secretActive, { expiresIn }); // token auth account
        
        await sendTestEmail(email, token)
        .then(()=>{
            return res.json({
                code: 200,
                message: "Đăng ký tài khoản Thành Công. Vui lòng vào email kích hoạt tài khoản!\nLiên kết sẽ hết hạn sau 1 phút.",
                data: token
            })
        })
        .catch((err)=>{
            console.log("Error at accountController: ", err)
            return res.json({
                code: 304,
                message: "Gửi email thất bại",
                data: []
            })
        })

       
       
    }
    catch(err)
    {
        console.log("Error at Register Controller: ", err)
        return res.json({
            code: 304,
            message: "Đăng Ký Thất Bại. Vui lòng thử lại sau!",
            data: []
        })
    }
  
}




const FindByEmail = (email) =>{ 
  
    return account = AccountModel.findOne({
        Email: email
    })
}




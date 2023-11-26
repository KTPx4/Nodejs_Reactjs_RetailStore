const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const validator = require('email-validator');
const AccountModel = require('../../models/AccountModel')

module.exports.InputLogin = (req, res, next)=>{
    let {user, password} = req.body
    
    if(!user)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập User"
        });
    }
   
    if(!password)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập Password"
        });
    } 

  

    next()
}

module.exports.InputRegister = async(req, res, next)=>{
    let {email, fullName} = req.body
    if(!email)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập Email"
        });
    }
    
    if (!validator.validate(email)) 
    {
        return res.json({
            code: 400,
            message: "Email không hợp lệ"
        });    
    }
    let user = email.split("@")[0];

    if(!fullName)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ tên"
        });
    } 

    var accountByEmail = await AccountModel.findOne({ Email: email })
    var accountByUser = await AccountModel.findOne({ User: user})
    
    if(accountByEmail)
    {
        return res.json({
            code: 400,
            message: "Email đã tồn tại"
        })
    }
    if(accountByUser)
    {
        return res.json({
            code: 400,
            message: "User đăng nhập (Phần trước @) đã tồn tại"
        })
    } 

    next()
}

module.exports.InputActive = async(req, res, next)=>{
   // let email =req.query.email || req.body.email 
    let token = req.query.token || req.body.token
    
    // if(!email)
    // {
    //     return res.json({
    //         code: 301,
    //         message: "Thiếu địa chỉ email"
    //     });
    // } 
    if(!token)
    {
        return res.json({
            code: 400,
            message: "Thiếu Token Active"
        });
    }

    // let account = await AccountModel.findOne({
    //     Email: email
    // })

    // if(!account)
    // {
    //     return res.json({
    //         code: 304,
    //         message: "Email hoặc tài khoản không tồn tại để kích hoạt"
    //     })
    // }
    next()

    
}

module.exports.InputChangePass = async (req, res, next) =>{
    let {oldPassword, newPassword} = req.body
    if(!oldPassword)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu cũ"
        })
    }
    if(!newPassword)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu mới"
        })
    }
    next()

}

module.exports.InputSendAcitve = async (req, res, next) =>
{
    let {email}  =req.body
    if(!email)
    {
        return res.json({
            code: 400,
            message: "Thiếu địa chỉ email cần gửi kích hoạt"
        })
    }
    let account = await AccountModel.findOne({Email: email})
    
    if(!account)
    {
        return res.json({
            code: 400,
            message: "Tài Khoản không tồn tại để kích hoạt"

        })
    }
    else
    {
        next()
    }

    
}
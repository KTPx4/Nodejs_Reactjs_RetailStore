const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const validator = require('email-validator');
const AccountModel = require('../../models/AccountModel')
const bcrypt = require('bcrypt')

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
    email = email.toLowerCase()
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
    if(newPassword.length < 5)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu ít nhất 5 ký tự"
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
            message: "Thiếu địa chỉ email"
        })
    }
    email = email.toLowerCase()
    let account = await AccountModel.findOne({Email: email})
    
    if(!account)
    {
        return res.json({
            code: 400,
            message: "Tài Khoản không tồn tại hoặc vừa bị xóa"

        })
    }
    else
    {
        next()
    }

    
}

module.exports.UpdateProfile = async(req, res, next)=>
{
    let {fullName, oldPass, newPass, email} = req.body
    //console.log(fullName);
    if(!fullName)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ họ tên"
        })
    }
    else if(!email)
    {
        return res.json({
            code: 400,
            message: "Vui lòng cung cấp email người cần chỉnh sửa profile"
        })
    }
    else if(newPass && !oldPass)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu cũ"
        })
    }
    else if(!newPass && oldPass)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu mới"
        })
    }
    else if(newPass && oldPass && newPass.length < 5)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu mới ít nhất 5 ký tự"
        })
    }
    else if(newPass && oldPass)
    {
        email = email.toLowerCase()
        Account = await AccountModel.findOne({Email: email})
    
        if(!Account)
        {
            return res.json({
                code: 401,
                message: 'Tài khoản vừa bị xóa. Không thể cập nhật.'
            })
        }   
    //    console.log(oldPass, Account);
        await bcrypt.compare(oldPass, Account.Password)
        .then(PassMatch=>{
            if(!PassMatch)
            { 
                throw new Error('Mật khẩu không đúng')
                // return res.json({
                //     code: 400,
                //     message: "Mật khẩu cũ không đúng"
                // })
            }    
            else
            {
                return next()
            }  
        })
        .catch(err=> {
            //console.log("Error At Validator Account: ", err)
            return res.json({
                code: 400,
                message: "Lỗi khi cập nhật: " + err.message
            })
        })
    }
    else {
        return next()
    }
   
   

}
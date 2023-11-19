const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

const AccountModel = require('../models/AccountModel')

module.exports.InputLogin = (req, res, next)=>{
    let {email, password} = req.body
    if(!email)
    {
        return res.json({
            code: 301,
            message: "Vui lòng nhập Email"
        });
    }
    if (!emailRegex.test(email)) 
    {
        return res.json({
            code: 302,
            message: "Email không hợp lệ"
        });    
    }
    if(!password)
    {
        return res.json({
            code: 301,
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
            code: 301,
            message: "Vui lòng nhập Email"
        });
    }
    if (!emailRegex.test(email)) 
    {
        return res.json({
            code: 302,
            message: "Email không hợp lệ"
        });    
    }
    if(!fullName)
    {
        return res.json({
            code: 301,
            message: "Vui lòng nhập đầy đủ tên"
        });
    } 

    var account = await AccountModel.findOne({ Email: email })

    
    if(account)
    {
        return res.json({
            code: 303,
            message: "Email đã tồn tại"
        })
    }
  

    next()
}

module.exports.InputActive = async(req, res, next)=>{
    let email =req.query.email || req.body.email 
    let token = req.query.token || req.body.token
    
    if(!email)
    {
        return res.json({
            code: 301,
            message: "Thiếu địa chỉ email"
        });
    } 
    if(!token)
    {
        return res.json({
            code: 301,
            message: "Thiếu Token Active"
        });
    }

    let account = await AccountModel.findOne({
        Email: email
    })

    if(!account)
    {
        return res.json({
            code: 304,
            message: "Email hoặc tài khoản không tồn tại để kích hoạt"
        })
    }
    next()

    
}
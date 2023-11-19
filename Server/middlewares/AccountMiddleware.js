const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

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

module.exports.InputRegister = (req, res, next)=>{
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
  

    next()
}
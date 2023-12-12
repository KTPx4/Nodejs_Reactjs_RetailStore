const jwt = require('jsonwebtoken');
const AccountModel = require('../../models/AccountModel');
const SECRET_LOGIN = process.env.TOKEN_LOGIN_ACCOUNT || 'token-login-account';


const authAccount =  (req, res, next) =>{
    
    let tokenFromHeader =(req.header('Authorization'))
    let token = undefined

    if(!tokenFromHeader)
        token =  req.body.token  

    else
        token = tokenFromHeader.split(' ')[1]


    if(!token || token === undefined)
    {
        return res.json({
            code: 401,
            message: 'Vui lòng đăng nhập mới có quyền truy cập'
        })
    }

    jwt.verify(token, SECRET_LOGIN, async(err, data)=>{
        if(err)
        {
            return res.json({
                code: 400,
                message: 'Đăng nhập thất bại hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!'
            })
        }
        let email = data.email?.toLowerCase()
        let account = await AccountModel.findOne({Email: email})
        
        if(!account)
        {
            return res.json({
                code: 401,
                message: 'Tài khoản vừa bị xóa, không thể đăng nhập'
            })
        }

        req.User = account
        return next()
    }) 
  

}

const authRoleAmin = async(req, res, next)=>{
    
    await authAccount(req, res, async()=>{
       // console.log(req.User);
        let emailAccount = req.User.Email || '' // get from auth 
    
        let code =400
        let error  = ''
        await AccountModel.findOne({Email: emailAccount})
        .then(account =>{
            if(!account)
            {
                code = 401
                // error = 'Tài khoản của bạn bị xóa hoặc email không còn đúng'
                throw new Error("Tài khoản của bạn bị xóa hoặc email không còn đúng")
            }
            else
            {
                let Role = account.Role || ''
                if(!Role.includes("Admin"))
                {
                    code = 403
                    // error = 'Tài khoản của bạn không đủ quyền hạn để truy cập'
                    throw new Error("Tài khoản của bạn không đủ quyền hạn để truy cập")

                }   

            }
    
        })
        .then(()=>{
            return next()
        })
        .catch((err)=>{
            return res.json({
                code: code,
                message: err.message
            })
        })       
   
    })
   
    
}



module.exports.AuthAccount = authAccount

module.exports.AuthRoleAmin = authRoleAmin

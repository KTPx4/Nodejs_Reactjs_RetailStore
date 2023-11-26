const jwt = require('jsonwebtoken');
const { sendTestEmail } = require("../modules/mailer");
const bcrypt = require('bcrypt')

// Variable
const SERVER = process.env.SERVER || 'http://localhost:3000' 
const SECRET_ACTIVE = process.env.TOKEN_ACTIVE_ACCOUNT || 'token-active-account';
const SECRET_LOGIN = process.env.TOKEN_LOGIN_ACCOUNT || 'token-login-account';

//model
const AccountModel = require('../models/AccountModel')


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
        message: "Danh Sách Tài Khoản",
        data: {
            length: account.length,
            account: account
        }
    })
}

module.exports.Login = async(req, res) =>{
    
    let {user, password} = req.body 

    let accountUser = undefined

    // find db
    await AccountModel.findOne({User: user})
    .then(account =>{
        if(!account)
        {
            throw new Error('Tài Khoản không tồn tại')
        }
        accountUser = account
        return bcrypt.compare(password, account.Password)
    })
    .then((PassMatch)=> {
        if(!PassMatch)
        {
            throw new Error('Mật khẩu không đúng')
        }

    })      
    .then(()=>{
        if( !accountUser.isActive)
            throw new Error('Tài Khoản của bạn chưa được kích hoạt. Vui lòng kích hoạt trước khi đăng nhập')
        
        if( accountUser.isDeleted)
            throw new Error('Tài Khoản của bạn đã bị khóa hoặc xóa. Vui lòng liên hệ quản lý của bạn')

    })
    .then(()=>{
        // store jwt login
       
        let data = {
            email: accountUser.Email,
            role: accountUser.Role
        }
        jwt.sign(data, SECRET_LOGIN, {expiresIn: '1h'}, (err, tokenLogin)=>{
            if(err) throw err
            
            if(accountUser.firstLogin)
            {
                return res.json({
                    code: 203,
                    message: 'Đăng nhập thành công',
                    data: {
                        token: tokenLogin
                    }
                })
            }
            else
            {
                return res.json({
                    code: 200,
                    message: 'Đăng nhập thành công',
                    data: {
                        token: tokenLogin
                    }
                })
            }
            
        })

    })
    .catch(err=>{
        return res.json({
            code: 400,
            message: 'Đăng nhập tài khoản thất bại: ' + err.message 
        })
    })
   
}

module.exports.Register = async(req, res)=>{
    let {email, fullName} = req.body
    let role = req.body.role || "User"
    let isActive = role.includes("Admin") ? true : false;

    //console.log("email:::: ", email);  

    let UserName = email.split("@")[0];
    let Password = UserName || '12345'
    let token = ''
    try{

        bcrypt.hash(Password, 10)
        .then(async(hashed) =>{
            
            const Account = await AccountModel.create({
                fullName: fullName,
                Email: email,
                Password: hashed,
                User: UserName || email,
                Role: role,
                isActive: isActive
            });
// send email
            const data = {
                email: Account.Email
            }
            const expiresIn = '1m';
            token = jwt.sign(data, SECRET_ACTIVE, { expiresIn }); // token auth account
            
            const subject = "Active Account";
            const html = `
              <p>Hí bạn ${email},</p>
              <p>Vui lòng kích hoạt tài khoản của bạn <a href="${SERVER}/api/account/active?email=${email}&token=${token}" >Tại đây</a> </p>
              <strong>Liên Kết sẽ hết hạn trong 1 phút, vui lòng nhanh cái tay lên ^^</strong>
              <p>Thank you</p>
              `;
    
            return await sendTestEmail(email, subject, html)
         
        })
        .then(()=>{
            return res.json({
                code: 200,
                message: "Đăng ký tài khoản Thành Công. Vui lòng vào email kích hoạt tài khoản!\nLiên kết sẽ hết hạn sau 1 phút.",
                data: {
                    token: token
                }
            })
        })
        .catch((err)=>{
            console.log("Error at accountController: ", err)
            return res.json({
                code: 400,
                message: "Gửi email thất bại"
               
            })
        })

       
       
    }
    catch(err)
    {
        console.log("Error at Register Controller: ", err)
        return res.json({
            code: 400,
            message: "Đăng Ký Thất Bại. Vui lòng thử lại sau!"
        })
    }
  
}

module.exports.Active = async(req, res)=>{
    // let email =req.query.email || req.body.email 
    let token = req.query.token || req.body.token

    jwt.verify(token, SECRET_ACTIVE, async(err, data) => {
        if (err) 
            return res.json({
                code: 400,
                message: "Kích hoạt Tài khoản thất bại hoặc liên kết đã hết hạn!"
        });
     
        let email = data.email
        await AccountModel.findOneAndUpdate({Email: email}, {isActive: true})
        .then(()=>{
            
            return res.json({
                code: 200,
                message: "Kích Hoạt tài khoản thành công",
                data: {
                    email: data.email
                }
            })
        })
        .catch(err =>{
            console.log("Error at Account controller: " + err)
            return res.json({
                code: 400,
                message: "Kích hoạt tài khoản thất bại",
                data: {
                    email: data.email
                }
            })
        })
        
    })
}

module.exports.CreateActive = async(req, res)=>{
    let {email} = req.body
    try{

        const data = {
            email: email
        }
        const expiresIn = '1m';
        token = jwt.sign(data, SECRET_ACTIVE, { expiresIn }); // token auth account
        
        const subject = "Active Account";
        const html = `
          <p>Hí bạn ${email},</p>
          <p>Vui lòng kích hoạt tài khoản của bạn <a href="${SERVER}/api/account/active?email=${email}&token=${token}" >Tại đây</a> </p>
          <strong>Liên Kết sẽ hết hạn trong 1 phút, vui lòng nhanh cái tay lên ^^</strong>
          <p>Thank you</p>
          `;

        await sendTestEmail(email, subject, html)
        .then(()=>{
            return res.json({
                code: 200,
                message: "Gửi xác thực tài khoản Thành Công. Liên kết sẽ hết hạn sau 1 phút.",
                data: {
                    token: token
                }
            })
        })
        .catch((err)=>{
            console.log("Error at accountController: ", err)
            return res.json({
                code: 400,
                message: "Gửi email thất bại"
               
            })
        })

       
       
    }
    catch(err)
    {
        console.log("Error at create active Controller: ", err)
        return res.json({
            code: 400,
            message: "Gửi xác thực. Vui lòng thử lại sau!"
        })
    }
  
}

module.exports.ChangePassword = async(req, res) =>{
    let {oldPassword, newPassword} = req.body
    let email = req.User.email

    AccountModel.findOne({Email: email})
    .then(account=>{
        if(!account)
        {
            throw new Error('Tài khoản không tồn tại')
        }

        return bcrypt.compare(oldPassword, account.Password)
    })
    .then((PassMatch) =>{
      //  console.log(PassMatch);
        if(!PassMatch)
        {
            throw new Error('Mật khẩu cũ không đúng')
        }
    })
    .then(()=>{
        return bcrypt.hash(newPassword, 10)        
    })
    .then((hashed)=>{
        return AccountModel.findOneAndUpdate({Email: email}, {Password: hashed});
    })
    .then(()=>{
        return res.json({
            code: 200,
            message: "Cập nhật mật khẩu mới thành công"
        })
    })
    .catch(err=>{
        return res.json({
            code: 400,
            message: "Không thể đổi mật khẩu: " + err.message
        })
    })
}




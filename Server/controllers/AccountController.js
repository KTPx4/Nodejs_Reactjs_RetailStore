const jwt = require('jsonwebtoken');
const { sendTestEmail } = require("../modules/mailer");
const bcrypt = require('bcrypt')
const fs = require('fs');

// Variable
const SERVER_CLIENT = process.env.SERVER_CLIENT || 'http://localhost:3000' 
const SECRET_ACTIVE = process.env.TOKEN_ACTIVE_ACCOUNT || 'token-active-account';
const SECRET_LOGIN = process.env.TOKEN_LOGIN_ACCOUNT || 'token-login-account';


//model
const AccountModel = require('../models/AccountModel');
const { log } = require('console');


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
  //  console.log("1 Request login");
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
        req.User = accountUser;
        const {root} = req.vars
        let data = {
            fullName: accountUser.fullName,
            email: accountUser.Email,
            role: accountUser.Role,
            id: accountUser._id,
            avt: accountUser.NameAvt
        }
// console.log("Name Avt - Login Controller,",accountUser.NameAvt);
        // create folder store avatar - name avt and folder -> id of user
        if(!createFolder(root, accountUser._id, accountUser.NameAvt))
        {
            console.log("Can't create folder for UserID: ", Account._id);
        }

        jwt.sign(data, SECRET_LOGIN, {expiresIn: '5h'}, (err, tokenLogin)=>{
            if(err) throw err
            
            if(accountUser.firstLogin)
            {
                return res.json({
                    code: 203,
                    message: 'Đăng nhập thành công',
                    data: {
                        token: tokenLogin,
                        email: accountUser.Email,
                        role: accountUser.Role
                    }
                })
            }
            else
            {
                return res.json({
                    code: 200,
                    message: 'Đăng nhập thành công',
                    data: {
                        token: tokenLogin,
                        email: accountUser.Email,
                        role: accountUser.Role
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
    let fLogin = role.includes("Admin") ? false : true;
    
    //console.log("email:::: ", email);  

    let UserName = email.split("@")[0];
    let Password = UserName || '12345'
    let token = ''
    const {root} = req.vars
    try{

        bcrypt.hash(Password, 10)
        .then(async(hashed) =>{
            
            const Account = await AccountModel.create({
                fullName: fullName,
                Email: email,
                Password: hashed,
                User: UserName || email,
                Role: role,
                isActive: isActive,
                firstLogin: fLogin
            });

            // create folder store avatar - name avt and folder -> id of user
            if(!createFolder(root, Account._id, Account.NameAvt))
            {
                console.log("Can't create folder for UserID: ", Account._id);
            }
           
         
            // send email
            const data = {
                email: Account.Email
            }
            token = jwt.sign(data, SECRET_ACTIVE, { expiresIn:  '1m'}); // token auth account
            
            const subject = "Active Account";
            const html = `
              <p>Hí bạn ${email},</p>
              <p>Vui lòng kích hoạt tài khoản của bạn <a href="${SERVER_CLIENT}/account/active?token=${token}" >Tại đây</a> </p>
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
    let body = {}
    let tokenLogin = ''
    jwt.verify(token, SECRET_ACTIVE, async(err, data) => {
        if (err) 
        {
           // throw new Error('Liên kết đã hết hạn hoặc chưa đúng!');
            return res.json({
                code: 400,
                message: "Kích hoạt Tài khoản thất bại hoặc liên kết đã hết hạn!"
            })
        }
     
        let email = data.email
       
      
      

        await AccountModel.findOneAndUpdate({Email: email}, {isActive: true, firstLogin: true}, {new: true})
        .then(async(accountUser)=>{
            
            body = {
                fullName: accountUser.fullName,
                email: accountUser.Email,
                role: accountUser.Role,
                id: accountUser._id,
                avt: accountUser.NameAvt
            }
            
            tokenLogin = await jwt.sign(body, SECRET_LOGIN, {expiresIn: '5h'})
            
            req.User = accountUser

            return res.json({
                code: 200,
                message: "Kích Hoạt tài khoản thành công",
                data: {
                    email: data.email,
                    token: tokenLogin
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
    
        token = jwt.sign(data, SECRET_ACTIVE, { expiresIn: '1m' }); // token auth account
        
        const subject = "Active Account";
        const html = `
          <p>Hí bạn ${email},</p>
          <p>Vui lòng kích hoạt tài khoản của bạn <a href="${SERVER_CLIENT}/account/active?token=${token}" >Tại đây</a> </p>
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
                message: "Gửi email thất bại: " + err.message
               
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
module.exports.ChangePassword = async (req, res) => {
    
    try {
        if(!req.User)
        {
            return res.json({
                code: 401,
                message: 'Vui lòng đăng nhập bằng chức năng login'
            })
        }
        let { oldPassword, newPassword } = req.body;
       
        let email = req.User.Email;

        const account = await AccountModel.findOne({ Email: email });

        if (!account) 
        {
            throw new Error('Tài khoản không tồn tại');
        }

        // Nếu firstLogin là true, thực hiện hashPassword và update
        if (account.firstLogin) 
        {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await AccountModel.findOneAndUpdate(
                { Email: email },
                { Password: hashedPassword, firstLogin: false }
            );
        } 
        else 
        {
            // Nếu firstLogin là false, thực hiện so sánh mật khẩu cũ và cập nhật
            const passwordMatch = await bcrypt.compare(oldPassword, account.Password);

            if (!passwordMatch) {
                throw new Error('Mật khẩu cũ không đúng');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await AccountModel.findOneAndUpdate(
                { Email: email },
                { Password: hashedPassword }
            );
        }

        return res.json({
            code: 200,
            message: "Cập nhật mật khẩu mới thành công"
        });
    } 
    catch (err) {
        return res.json({
            code: 400,
            message: "Không thể đổi mật khẩu: " + err.message
        });
    }
};

module.exports.VerifyLogin = async (req, res) =>{
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
            message: 'Chưa có token'
        })
    }

    jwt.verify(token, SECRET_LOGIN, async(err, data)=>{
        if(err)
        {
            return res.json({
                code: 401,
                message: 'Chưa đăng nhập, hoặc phiên đăng nhập đã hết hạn'
            })
        }
        let email = data.email || "";
        let acc =await AccountModel.findOne({Email: email})
        if(!acc)
        {
            return res.json({
                code: 400,
                message: 'Không tìm thấy tài khoản'
            })   
        }

        if(acc.firstLogin)
        {
            return res.json({
                code: 203,
                message:"Đăng nhập thành công",
                data:
                {
                    email: acc.Email,
                    role: acc.Role,
                    fullName: acc.fullName,                  
                    id: acc._id,
                    avt: acc.NameAvt
                }
            })
        }
            
        return res.json({
            code: 200,
            message: 'Đã Đăng Nhập',
            data:
            {
                email: acc.Email,
                role: acc.Role,
                fullName: acc.fullName,                  
                id: acc._id,
                avt: acc.NameAvt
            }
        })
    }) 
}

module.exports.UpdateProfile = async (req, res) =>{
    let tokenFromHeader =(req.header('Authorization'))
    let token = undefined
    let Account= undefined
    let {root}  = req.vars
    let {fullName, newPass, email} = req.body

    Account = await AccountModel.findOne({Email: email})
    
    if(!Account)
    {
        return res.json({
            code: 401,
            message: 'Tài khoản vừa bị xóa. Không thể cập nhật.'
        })
    }   
   
    let newPassHash = undefined
    let id = Account._id
    let data = undefined
  
    try
    {
       // console.log("Log at update profile - file: ", req.file);
        if(newPass)
        {
           newPassHash = await bcrypt.hash(newPass, 10)
        }
        let newNameAVT = await upLoadAvt(req.file, root,  Account)
      //  console.log("Name new avt: ",newNameAVT);
        let account = await AccountModel.findOneAndUpdate({_id: id}, {
            fullName: fullName,
            Password: newPassHash,
            NameAvt: newNameAVT                
        }, {new: true})
      
        data = {
            fullName: fullName,
            email: account.Email,
            role: account.Role,
            id: account._id,
            avt: account.NameAvt
        }    
       
        let token = await jwt.sign(data, SECRET_LOGIN, {expiresIn: '5h'});
       
        return res.json({
            code: 200,
            message: 'Thay đổi thông tin thành công',
            data: {
                token: token,
                email: data.Email,
                role: data.Role
            }
        })      
    }
    catch(err)
    {
        console.log("Error At Account Contronller - UpdateProfile: ", err.message);
        return res.json({
                    code: 400,
                    message: "Không thể cập nhật thông tin",
                  
        })
    }
 

}


module.exports.GetAllProfile = (req, res) =>{

}
module.exports.GetProfileByID = (req, res) =>
{

}

const createFolder = (root, idUser, nameAvt)=>
{
 
    const ROOT_AVT = root + "/public/account"

    let defaultAvt = `${ROOT_AVT}/Blank_Avatar.png`
 
    let folderAccount = ROOT_AVT + "/" + idUser  

    let UserAvt = `${ROOT_AVT}/${idUser}/${nameAvt}`

    try
    {
        if (!fs.existsSync(folderAccount)) 
        {               
            fs.mkdirSync(folderAccount);   
        }

        if(!fs.existsSync(UserAvt) && fs.existsSync(defaultAvt))
        {
           // console.log("ok, ", UserAvt);
            fs.copyFileSync(defaultAvt, UserAvt)
        }
    }
    catch(err)
    {
        console.log("Error at AccounController - Create Folder Img For User: ", err);
        return false;
    }
    return true;
    // Kiểm tra xem tệp tin nguồn tồn tại hay không
}

const upLoadAvt =async (file, root, AccUser)=>{
       //console.log("Upload Avt call");
    let id = AccUser._id
    
    const currentPath = `${root}/public/account/${id}`

    if(file)
    {
        if(!fs.existsSync(currentPath))
        {
            fs.mkdir(currentPath, (error) => 
            { 
                if (error) 
                {
                    console.log("Error at create Folder Upload: ", error.message);    
                }
            });
        }
   //     console.log(file);
  
        let name = file.originalname
        let temp = name.split('.')
        let extension = temp[temp.length - 1]
       // let nameImg = temp.slice(0, -1).join('.')

        let newFilePath = currentPath + '/' +  `${id}.${extension}`

        fs.renameSync(file.path, newFilePath)

        return `${id}.${extension}`
    }

    return undefined
   
}


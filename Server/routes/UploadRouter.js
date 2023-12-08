
const express = require('express')
const fs = require('fs')
const app = express.Router()
const bodyParser = require('body-parser')
const PathModule = require('path')

const AccountValidator = require('../middlewares/Account/Validator')
const Auth = require('../middlewares/Account/Auth')


//app.use(bodyParser.json())

const multer = require('multer')

module.exports = (root)=>{
    
    const uploader = multer({dest: root +'/uploads/'})
    
    app.post('/', Auth.AuthAccount, uploader.single('avt'), (req, res)=>{
                            
        if(!req.User)
        {
            return res.json({
                code: 401,
                message: 'Vui lòng đăng nhập bằng chức năng login'
            })
        }
        const file = req.file
        let AccUser = req.User
        let id = AccUser._id
        
        const currentPath = `${root}/public/account/${id}`
        
     
       // console.log(currentPath);

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
    
            console.log(file);
        //    return res.end("Upload Ok")
            let name = file.originalname

            let temp = name.split('.')


            let extension = temp[temp.length - 1]
            let nameImg = temp.slice(0, -1).join('.')

            let newFilePath = currentPath + '/' +  `${id}.${extension}`
    
            fs.renameSync(file.path, newFilePath)
    
            // let name = file.originalname
            // let newFilePath = currentPath + '/' + name 
    
            // fs.renameSync(file.path, newFilePath)
    
    
          
        }

        return res.end("Upload Failed")
      
    
    })

    return app
}
const express = require('express');
const app = express.Router()
const HomeController = require('../controllers/HomeController')
const bodyParser = require('body-parser')
const AccountModel = require('../models/AccountModel')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.json({
        code: 200,
        message: "Welcome to my web api - develop by Px4",
        data:{
            root: "/api",
            supportURL:{
                account:[                    
                    {
                        Domain: "/",
                        Method: "get",
                        Auth: "Role Admin",
                        Desc: "Get All list Account"           
                    },
                    {
                        Domain: "/profile/:id",
                        Method: "get",
                        Auth: "Role Admin",
                        Desc: "Get Profile By Id "           
                    },
                    {
                        Domain: "/profile",
                        Method: "put",
                        Auth: "User",
                        Desc: "Update Profile"           
                    },
                    {
                        Domain: "/active?token=",
                        Method: "get",
                        Auth: "",
                        Desc: "Active account by token"           
                    },                   
                    {
                        Domain: "/login",
                        Method: "post",
                        Auth: "",
                        Desc: "Login And Get Token Auth"           
                    },
                    {
                        Domain: "/login",
                        Method: "get",
                        Auth: "",
                        Desc: "Verify Token Login "           
                    },
                    {
                        Domain: "/register",
                        Method: "post",
                        Auth: "Admin",
                        Desc: "Create new account"           
                    },                   
                    {
                        Domain: "/sendactive",
                        Method: "post",
                        Auth: "Admin",
                        Desc: "Create Active Email For user"           
                    },                   
                    {
                        Domain: "/setstatus",
                        Method: "post",
                        Auth: "Admin",
                        Desc: "Update status of user"           
                    },                   
                    {
                        Domain: "/changepassword",
                        Method: "post",
                        Auth: "User",
                        Desc: "Change Their Pass word"           
                    },
                   
                ],
                products: [
                    {
                        Domain: "/",
                        Method: "get",
                        Auth: "User",
                        Desc: "Get All list product"          
                    },
                    {
                        Domain: "/",
                        Method: "post",
                        Auth: "Admin",
                        Desc: "Create new product"          
                    },
                    {
                        Domain: "/:barcode",
                        Method: "put",
                        Auth: "Admin",
                        Desc: "update product by barcode"          
                    },
                    {
                        Domain: "/:barcode",
                        Method: "delete",
                        Auth: "Admin",
                        Desc: "Delete product by barcode"          
                    },
                ]
                    
                                
                
            }
        }
    })
})


module.exports= app


const express = require('express');
const app = express.Router()
const HomeController = require('../controllers/HomeController')
const bodyParser = require('body-parser')
const AccountModel = require('../models/AccountModel')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', HomeController.GetAll)

app.post("/", async(req, res)=>{

    
    // Tạo lại bảng users
    const Account = await AccountModel.create({
        fullName: req.body.fullName,
        Email: req.body.email,
        Password: req.body.password || '12345',
        User: req.body.user || req.body.email
    });

    res.json(Account)
    
 
})

module.exports= app


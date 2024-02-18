
const express = require('express');
const app = express.Router()

//Midleware 
const Auth = require('../middlewares/Account/Auth')

//Controller
const CustController = require('../controllers/CustomerController')

//Model
const CustModel = require('../models/Customer')

app.get('/', Auth.AuthAccount, CustController.GetAll) // get all customer
app.get('/:id', Auth.AuthAccount ,CustController.GetByID) // get cust by id


module.exports = app

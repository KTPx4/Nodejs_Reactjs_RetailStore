const express = require('express');
const app = express.Router()

const OrderController = require('../controllers/OrderController')
const Auth = require('../middlewares/Account/Auth')

const Mid = require('../middlewares/Order/Validator')


app.get('/customer',  Auth.AuthAccount, OrderController.GetByPhoneCust)
app.get('/', Auth.AuthAccount, OrderController.GetAll) // get all
app.get('/:id', Auth.AuthAccount,OrderController.GetByID) // get by id

app.post('/', Auth.AuthAccount, Mid.Validator, OrderController.Create) // Create new order


module.exports = app

/*
    StaffID
    Phone - (Address- name)
    TotalPayment

    List Cart:
    {
        BarCode,
        Quantity,
        TotalPrice
    }
*/
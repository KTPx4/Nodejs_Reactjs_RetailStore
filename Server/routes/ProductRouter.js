const express = require('express');
const app = express.Router()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
//Controller
const ProductController = require('../controllers/ProductController')

//Midleware
const Auth = require("../middlewares/Account/Auth")
const ProductMid = require('../middlewares/Product/Validator')


app.get('/', Auth.AuthAccount, ProductController.GetAll)
app.post('/', Auth.AuthRoleAmin, ProductMid.InputAdd, ProductController.Add)

app.put('/:barcode', Auth.AuthRoleAmin, ProductMid.ExistsProduct, ProductMid.InputEdit, ProductController.Update)
app.delete('/:barcode', Auth.AuthRoleAmin, ProductMid.ExistsProduct, ProductController.Delete)


module.exports= app


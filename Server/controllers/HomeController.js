const AccountModel = require('../models/AccountModel')


module.exports.GetAll = async(req, res) =>{
    const account = await AccountModel.find();
    res.json({
        code: 200,
        message: "Get All Account Success!",
        data: account
    })
}
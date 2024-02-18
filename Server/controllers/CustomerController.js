const CustomerModel = require('../models/Customer')

module.exports.GetAll = async(req, res) =>{
    try{
        let {search} = req.query
        let Customer = []

        if(search)
        {
            Customer = await CustomerModel.find({
                $or:[
                    {Phone: {$regex: new RegExp(search, 'i')}},
                    {fullName: {$regex: new RegExp(search, 'i')}},
                    {Address: {$regex: new RegExp(search, 'i')}},
                ]
            })
        }
        else
        {
            Customer = await CustomerModel.find()
        }

        return res.json({
            code: 200,
            message: "Lấy danh sách khách hàng thành công",
            data:{
                customers: Customer
            }
        })
    }
    catch(err)
    {
        console.log("Error at CustomerController - Get All, ", err);
    }

  
   
}

module.exports.GetByID = async(req, res) =>{
    let {id} = req.params
    let Customer = await CustomerModel.findOne({_id: id})
   
    return res.json({
        code: 200,
        message: "Tìm Thấy khách hàng",
        data:{
            customers: Customer
        }
    })
}

module.exports.Create = async(req, res) =>{

}
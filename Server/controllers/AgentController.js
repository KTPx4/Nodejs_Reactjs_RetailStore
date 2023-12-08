const AgentModel = require('../models/Agent')


module.exports.GetAll = async(req, res) =>{
    const agents = await AgentModel.find();
    res.json({
        code: 200,
        message: "Get All Agent Success!",
        data: agents
    })
}

module.exports.Add = async ( req, res)=>{
    let {Name, Address, Description} = req.body
   
    await AgentModel.create({
        Name: Name,
        Address: Address,
        Description: Description
    })
    .then((agent)=>{
        return res.json({
            code: 200,
            message: "Tạo Agent Thành Công",
            data: agent
        })
    })
    .catch(err=>{
        return res.json({
            code: 400,
            message: "Tạo Agent Thất Bại"
        })
    })
}
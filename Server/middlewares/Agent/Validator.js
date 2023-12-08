
module.exports.Create = async(req, res, next)=>{
    let {Name, Address, Description} = req.body
    if(!Name || !Address || !Description)
    {
        return res.json({
            code: 400,
            message: "Thiếu Thông tin (Name || Address || Description)"
            
        })
    } 
    next()
}
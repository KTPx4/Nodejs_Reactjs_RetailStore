const CustomerModel = require('../../models/Customer')

module.exports.Validator = async(req, res, next)=>{
    let {phone, fullName, Address, ListCart, MoneyGiven, MoneyExchange, secondTime} = req.body 
    if(!phone)
    {
        return res.json({
            code: 400,
            message: "Vui lòng nhập số điện thoại"
        })
    }

    let cust = await CustomerModel.findOne({Phone: phone})
    if(!cust)
    {
        if(!fullName && !Address)
        {
            
            return res.json({
                code: 205,
                message: "Vui lòng cung cấp thêm thông tin tạo mới"
            })
        }
        else if(!fullName)
        {
            return res.json({
                code: 400,
                message: "Vui lòng cung cấp họ và tên"
            })
        }
        else if(!Address)
        {
            return res.json({
                code: 400,
                message: "Vui lòng cung cấp địa chỉ"
            })
        }
       else  // create if not exists
       {
           
            let cust = await CustomerModel.create({
                Phone: phone,
                Address: Address,
                fullName: fullName
            })          
       }
    }
    if(!secondTime)
    {
        return res.json({
            code: 204,
            message: "Thông tin khách hàng",
            data:{
                customer: cust
            }
        })
    }
    
    if(!MoneyGiven || isNaN(MoneyGiven) || parseFloat(MoneyGiven) < 0)
    {
        return res.json({
            code: 400,
            message: "Thiếu thông tin tiền khách đưa hoặc chưa đúng"
        })
    }

    if(!MoneyExchange || isNaN(MoneyExchange) || parseFloat(MoneyExchange) < 0)
    {
        return res.json({
            code: 400,
            message: "Thiếu thông tin tiền thối lại hoặc chưa đúng"
        })
    }

    if ( ListCart?.length > 0 && Array.isArray(ListCart)) 
    {
        // Kiểm tra từng phần tử trong ListCart
        const isListCartValid = ListCart.every(item => (

            item &&                  
            item.BarCode !== undefined && item.BarCode 
            &&   
            item.Quantity !== undefined && item.Quantity 
            &&  
            item.TotalPrice !== undefined && item.TotalPrice   
            &&   
            !isNaN(item.Quantity)
            &&
            parseInt(item.Quantity) > 0
            &&           
            !isNaN((item.TotalPrice)) 
            && 
            parseFloat(item.TotalPrice) > 0

        ));

        if (isListCartValid) 
        {
            return next()
        
        } else 
        {        
            return res.json({ 
                code: 400,
                message: "Danh sách sản phẩm không hợp lệ"
            });
        }
    } 
    else 
    {
        // ListCart không tồn tại hoặc không phải là một mảng
        return  res.json({ 
            code: 400,
            message: "Thiếu danh sách sản phẩm hoặc không hợp lệ"
        });
    }
}

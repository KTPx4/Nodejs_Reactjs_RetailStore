const Yup =  require('yup')

const ProductModel = require('../../models/Product')
const OrderDetailModel = require("../../models/OrderDetail")
//

const ProductSchema = Yup.object().shape({
    BarCode: Yup.string().required('Thiếu thông tin BarCode').typeError('BarCode không hợp lệ'),
    ProductName: Yup.string().required('Thiếu thông tin ProductName').typeError('ProductName không hợp lệ'),
    OriginPrice: Yup.number().required('Thiếu thông tin OriginPrice').typeError('OriginPrice không hợp lệ'),
    DisplayPrice: Yup.number().typeError('DisplayPrice không hợp lệ'),
    Category: Yup.array().of(Yup.string()).required('Thiếu thông tin Category').typeError('Category không hợp lệ, Category phải là một mảng'),
});



module.exports.InputAdd = async(req, res, next) =>{
    let {BarCode,Category} = req.body   

    let product = await ProductModel.findOne({BarCode: BarCode})
    if(product)
    {
        return res.json({
            code: 400,
            message: "BarCode Đã Tồn Tại"
        })
    }

    if( ! Category || Category?.length < 0)
    {
        return res.json({
            code: 400,
            message: "Thiếu Thông Tin Category"
        })
    }
    else
    {       
        await ProductSchema.validate(req.body)
        .then(()=>{
            return next()
        })
        .catch(err=> 
        {
            return res.json({
                code: 400,
                message: err.message
            })
        })
    }  

   
}

module.exports.ExistsProduct = async(req, res, next) =>{

    let {barcode} = req.params 
  
    let product = await ProductModel.findOne({BarCode: barcode})
    if(!product)
    {
        return res.json({
            code: 400,
            message: "Sản phẩm không tồn tại hoặc BarCode chưa đúng"
        })
    }  
    else
    {
        let OrD = await OrderDetailModel.find({BarCodeID: barcode})
        if(OrD.length > 0)
        {
            return  res.json({
                code: 400,
                message: "Sản phẩm đã có đơn hàng, không thể xóa"
            })
        }
        else
        {

            return next()
        }
    }
}



const ProductModel = require("../models/Product")

module.exports.GetAll = async(req, res) =>{
    try{
        let Products = await ProductModel.find()

        return res.json({
            code: 200,
            message: "Lấy danh sách sản phẩm thành công",
            data:{
                products: Products
            }
        })
    }
    catch(err)
    {
        
        console.log("Error At ProductController - GetAll");
        return res.json({
            code: 500,
            message: "Lỗi Server",
            data:{
                products: Products
            }
        })
    }
   
}

module.exports.Add = async (req, res) =>{
    try
    {   
        let {BarCode, ProductName, OriginPrice, DisplayPrice, Category, Description, linkImg } = req.body
        if(!DisplayPrice) DisplayPrice = OriginPrice
        await ProductModel.create({
            BarCode: BarCode,
            ProductName: ProductName,
            OriginPrice: OriginPrice,
            DisplayPrice: DisplayPrice,
            Category: Category,
            Description: Description?? "",
            linkImg: linkImg
        })
        .then(product =>
        {
            return res.json({
                code: 200,
                message: "Tạo sản phẩm thành công",
                data:{
                    product: product
                }

            })
        })
        

    }
    catch(err)
    {
        console.log("Error at Productmodel - AddProduct, ", err);
        return res.json({
            code: 500,
            message: "Lỗi Server"          
        })
    }
}

module.exports.Update = async (req, res) =>{
    try
    {   
        let {barcode} = req.params
        let {ProductName, OriginPrice, DisplayPrice, Category, Description, linkImg} = req.body
        await ProductModel.findOneAndUpdate({BarCode: barcode}, {
            ProductName,
            OriginPrice,
            DisplayPrice,
            Category,
            Description,
            linkImg
        }, {new: true})
        .then(prod=>{
            return res.json({
                code: 200,
                message: `Cập nhật thành công sản phẩm ${barcode}`,
                data:{
                    product: prod
                }
            })
        })
        .catch(err=>{
            console.log("Error at ProductController - Update, ", err);
            return res.json({
                code: 400,
                message: "Không thể update sản phẩm"
            })
        })
    }
    catch(err)
    {
        console.log("Error at Productmodel - UpdateProduct, ", err);
        return res.json({
            code: 500,
            message: "Lỗi Server"          
        })
    }
}

module.exports.Delete = async (req, res) =>{
    let {barcode} = req.params
    await ProductModel.findOneAndDelete({BarCode: barcode}, {new: true})
    .then(prod=>{
        return res.json({
            code: 200,
            message: "Xóa thành công sản phẩm " + barcode,
            data:{
                product: prod
            }
        })
    })
    .catch(err =>{
        console.log("Error at ProductController - Delete:", err);
        return res.json({
            code: 400,
            message: "Lỗi!, không thể xóa sản phẩm ngay lúc này. Vui lòng thử lại sau"
        })
    })
}


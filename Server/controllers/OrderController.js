const mongoose = require('mongoose');
const OrderModel = require('../models/Order')
const OderDetailModel = require('../models/OrderDetail')
const ProductModel = require('../models/Product')
const CustModel = require('../models/Customer')

module.exports.GetAll = async (req, res) => {
    try 
    {
      let orders = await OrderModel.find();
     
      let returns = await Promise.all(orders.map(async (o) => 
      {
        let productList = await getDetail(o._id);
        let Customer = await CustModel.findOne({Phone: o.CustomerPhone})

        return { ...o.toObject(),Customer, productList };
      }));
  
     
      return res.json({
        code: 200,
        message: "Lấy thành công danh sách order",
        data: {
          orders: returns,
        },
      });

    } catch (error) {
      console.error("Error at OrderController - GetAll ", error);
      return res.json({
        code: 500,
        message: "Lỗi Tại Server!",
      });
    }
  };
  
module.exports.GetByPhoneCust = async(req, res) =>{
  let {phone} = req.query 
  if(!phone)
  {
    return res.json({
      code: 400,
      message: "Thiếu số điện thoại khách hàng"
    })
  }

  try 
  {
    let orders = await OrderModel.find({CustomerPhone: phone});
   
    let returns = await Promise.all(orders.map(async (o) => 
    {
      let productList = await getDetail(o._id);
      let Customer = await CustModel.findOne({Phone: o.CustomerPhone})

      return { ...o.toObject(),Customer, productList };
    }));

   
    return res.json({
      code: 200,
      message: "Lấy thành công danh sách order",
      data: {
        orders: returns,
      },
    });

  } catch (error) {
    console.error("Error at OrderController - GetAll ", error);
    return res.json({
      code: 500,
      message: "Lỗi Tại Server!",
    });
  }

}
module.exports.GetByID = async(req, res) =>{
    try
    {
        let {id} = req.params
       
        let Order = await OrderModel.findOne({_id: id})
        let productList = await getDetail(id);
        let Customer = await CustModel.findOne({Phone: Order.CustomerPhone})
        if(!Order)
        {
            return res.json({
                code: 201,
                message: "Không thể tìm thấy sản phẩm",
                data: {
                    orders: null
                }
            })
        }
        let result = {...Order?.toObject() , Customer , productList}

        return res.json({
            code: 200,
            message: "Lấy thành công danh sách order",
            data: {
                orders: result
            }
        })
    }
    catch(err)
    {
        console.log("Error at OrderController - GetByID, ", err);
        return res.json({
            code: 402, 
            message: "Không thể tìm thấy sản phẩm, vui lòng thử lại sau"
        })
    }
    
}

module.exports.Create = async (req, res) =>{
    try
    {
        let { StaffEmail, phone,  ListCart, MoneyGiven, MoneyExchange} = req.body 
    
        let Order = await OrderModel.create({
            StaffEmail: StaffEmail,
            CustomerPhone: phone,
            MoneyGiven: MoneyGiven,
            MoneyExchange: MoneyExchange
        })    
    
        let idOrder = Order._id
    
        // Check list product
       let checkProducts = await notExistsProducts(ListCart)
       if(checkProducts)
       {
            return res.json(checkProducts)
       }
    
       // create order detail for each product
       let SumMoney = 0
       SumMoney = await CreateDetail(idOrder, ListCart)
    
       // update totalprice
       let OrderResult = await OrderModel.findOneAndUpdate({_id: idOrder}, {ToltalPayment: SumMoney}, {new: true})
       
    
        return res.json({
            code: 200,
            message: "Tạo đơn hàng thành công",
            data: {
                order: OrderResult
            }
        })

    }
    catch(err) 
    {
        console.log("Error at OrderController - Create, ", err);
        return res.json({
            code: 400,
            message: "Vui lòng thửu lại sau!"
        })
    }
   
   
}


const notExistsProducts = async(ListProd) =>{
    await ListProd.map( async (e)=>{
        let barcode = e.BarCode
        let prod = await ProductModel.findOne({BarCode: barcode})
        if(!prod)
        {
            return {
                code: 400,
                message: "Sản phẩm không tồn tại hoặc đã bị xóa"
            }
        }
    })

    return false
}

const CreateDetail = async (OrderID, ListProd) =>{
    let Sum = 0
    await ListProd.map(async(e) =>{
        let barcode = e.BarCode,
            quantity = e.Quantity,
            totalPrice = e.TotalPrice

        Sum += parseFloat(totalPrice)

        let detail = await OderDetailModel.create({
            OrderID: OrderID,
            BarCodeID: barcode,
            Quantity: quantity,
            TotalPrice: totalPrice
        })
    })
    return Sum
}

const getDetail = async (orderID) => {
    try {
        let ObjectID  = mongoose.Types.ObjectId
        let objID =  new ObjectID(orderID)
    
        const productList = await OderDetailModel.aggregate([
        {
          $match: { OrderID: objID },
        },
        {
          $lookup: {
            from: 'products', // Tên của bảng Product
            localField: 'BarCodeID',
            foreignField: 'BarCode',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
        {
          $project: {
            OrderID: 1,
            ListProduct: {
              ProductName: '$product.ProductName',
              BarCode: '$product.BarCode',
              Quantity: '$Quantity',
              DisplayPrice: '$product.DisplayPrice',
            },
          },
        },
      ]);
  
      return productList;

    } catch (error) {
      console.error('Error fetching order products - OrderController:', error);
      throw error;
    }
  };
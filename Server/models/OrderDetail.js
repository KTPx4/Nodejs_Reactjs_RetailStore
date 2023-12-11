const  mongoose =require('mongoose')

let OrderDetailSchema = new mongoose.Schema({
    OrderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    BarCodeID: String,
    Quantity: Number,
    TotalPrice: Number
})

module.exports = mongoose.model('OrderDetail', OrderDetailSchema)
const  mongoose =require('mongoose')

let OrderDetailSchema = new mongoose.Schema({
    OrderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    BarCodeID: String,
    Quantity: {
        type: Number,
        default: 0
    },
    TotalPrice: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('OrderDetail', OrderDetailSchema)
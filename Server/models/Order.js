const  mongoose =require('mongoose')

let OrderSchema = new mongoose.Schema({
    StaffEmail: String,
    CustomerPhone: String,
    ToltalPayment: 
    {
        type: Number,
        default: 0
    },    
    MoneyGiven: {
        type: Number,
        default: 0
    },
    MoneyExchange: {
        type: Number,
        default: 0
    },
    CreateAt:{
        type: Date,
        default: Date.now
   }
})

module.exports = mongoose.model('Order', OrderSchema)
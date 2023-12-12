const  mongoose =require('mongoose')

let ProductSchema = new mongoose.Schema({
   BarCode: {
    type: String,
    unique: true
   },
   ProductName: {
    type: String
   },
   OriginPrice: 
   {
    type: Number,
    default: 0
   },
   DisplayPrice:{
    type: Number,
    default: 0
   },

   Category:{
      type: [String]
   },
   
   Description: String,

   CreateAt:{
    type: Date,
    default: Date.now
   },
   
   linkImg:{
      type: String
   }

})

module.exports = mongoose.model('Product', ProductSchema)
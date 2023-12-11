const  mongoose =require('mongoose')

let CustomerSchema = new mongoose.Schema({
    Phone:{
        type: String,
        unique: true
    },
    fullName: String,
    Address: String
})

module.exports = mongoose.model('Customer', CustomerSchema)
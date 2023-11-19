const  mongoose =require('mongoose')

let AccountSchema = new mongoose.Schema({
    fullName: String,
    Email: {
        type: String,
        unique: true
    },
    Password: String,
    User: String,
    Role: {
        type: String, 
        default: 'User'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    firstLogin:{
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Account', AccountSchema)
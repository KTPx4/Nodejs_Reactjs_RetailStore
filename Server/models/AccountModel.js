const  mongoose =require('mongoose')

let AccountSchema = new mongoose.Schema({
    fullName: String,
    Email: {
        type: String,
        unique: true
    },
    Password: String,
    User: {
        type:String,
        unique: true
    },
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
    } ,
    NameAvt: {
        type: String,
        default: null  // Đặt giá trị mặc định là null để có thể kiểm tra và cập nhật sau
    },
    AgentID: {
        type: String,
        default: '6571f0ef8a47e80ed41c6b9f'
    }

})
// Thêm hook để đặt giá trị mặc định cho các dòng đã có dữ liệu
AccountSchema.pre('save', function (next) {
    // Nếu giá trị của 'NameAvt' là null hoặc không được xác định, đặt giá trị mặc định là '_id.png'
    if (!this.NameAvt || this.NameAvt === null) {
        this.NameAvt = this._id + '.png';    
    }
    next();
});

module.exports = mongoose.model('Account', AccountSchema)
const express = require('express')
const app = express()
const  mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')
require('dotenv').config()


const HomeRouter = require('./routes/HomeRouter')
const AccountRouter = require('./routes/AccountRouter')
const AgentRouter = require('./routes/AgentRouter')
const UploadRouter= require('./routes/UploadRouter')
const ProductRouter = require("./routes/ProductRouter")
const CustomerRouter = require('./routes/CustomerRouter')
const OrderRouter = require('./routes/OrderRouter')

const port = process.env.PORT || 3000

const uploader = multer({dest: __dirname +'/uploads/'})

app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + "/client")))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((req, res, next)=>{
    req.vars = {root: __dirname}
    next()
 })


app.use('/api', HomeRouter)
// app.use('/api/account/upload', UploadRouter(__dirname))
app.use('/api/account', AccountRouter(__dirname))

app.use('/api/agents', AgentRouter)
app.use('/api/products', ProductRouter)
app.use('/api/customers', CustomerRouter)
app.use('/api/orders', OrderRouter)
// app.use('*', (req, res)=>{
//     res.json({
//         code: 404,
//         message: "The url not support"
//     })
// })

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});



const startProgram = async()=>{
   // console.log(await bcrypt.hash("12345", 10));
   
    await require('./models/DB')
    .then(async()=>{

      //      mongoose.connection.dropCollection('accounts')

      // updateAgent()
     // updateNameAvt()
        console.log("Connect DB Success");     

        app.listen(port, () => {
            console.log("App listen at: http://localhost:" + port);
            })
        
    })    
    .catch((err)=>{
        console.log("Connect DB Failed: ", err);
    })
  
}

startProgram()

async function updateAgent()
{
    try 
    {
        const Account = require('./models/AccountModel')
        const updateResult = await Account.updateMany({}, { $set: { AgentID: '6571f0ef8a47e80ed41c6b9f' } });
        console.log(`Updated ${updateResult.nModified} accounts.`);
    } 
    catch (error) 
    {
        console.error('Error updating AgentID:', error);
    }  
    
}
async function updateNameAvt() 
{
    try {
        const Account = require('./models/AccountModel')
        const accounts = await Account.find({});

        // Lặp qua tất cả các tài khoản và cập nhật giá trị NameAvt nếu nó không được xác định
        for (const account of accounts) {
            if (!account.NameAvt || account.NameAvt === null) {
                account.NameAvt = account._id + '.png';
                await account.save();
            }
        }

        console.log('Updated NameAvt for all accounts.');
    } catch (error) {
        console.error('Error updating NameAvt:', error);
    } finally {
        // Đóng kết nối sau khi hoàn tất
        mongoose.connection.close();
    }
}

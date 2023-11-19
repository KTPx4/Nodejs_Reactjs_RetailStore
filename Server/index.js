const express = require('express')
const app = express()
const  mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const HomeRouter = require('./routes/HomeRouter')
const AccountRouter = require('./routes/AccountRouter')

const port = process.env.PORT || 3000

app.use(cors())

app.use('/', HomeRouter)
app.use('/api/account', AccountRouter)



app.use('*', (req, res)=>{
    res.json({
        code: 404,
        message: "The url not support"
    })
})

// app.get("/", async(req, res)=> {
//     const account = await AccountMode.find()
//     res.json(account)
// })



const startProgram = async()=>{
    
   
    let connect = await require('./models/DB')
    .then(()=>{

        mongoose.connection.dropCollection('accounts')
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

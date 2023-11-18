const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3000

app.get("/", (req, res)=> console.log("Hello"))


app.listen(port, ()=>{
    console.log("App listen at: http:/localhost:"+port);
})
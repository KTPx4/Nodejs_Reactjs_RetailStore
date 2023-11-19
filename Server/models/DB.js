

const mongoose = require('mongoose');

const User = process.env.UserDB || "FinalNodejs"
const Password = process.env.PassDB || "FinalNodejs123"
const Area = process.env.AreaDB || "dbfinal.th4yvbk.mongodb.net"
const dbName = process.env.NameDB || "FinalNodejs"

const uri = `mongodb+srv://${User}:${Password}@${Area}/${dbName}`


module.exports =  mongoose.connect(uri)
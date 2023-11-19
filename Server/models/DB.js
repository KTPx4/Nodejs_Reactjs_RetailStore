

const mongoose = require('mongoose');

const User = process.env.UserDB || "FinalNodejs"
const Password = process.env.PassDB || "FinalNodejs123"
const Area = process.env.AreaDB || "dbfinal.th4yvbk.mongodb.net"
const dbName = process.env.NameDB || "FinalNodejs"

const uri = `mongodb+srv://${User}:${Password}@${Area}/${dbName}`

//   const connectDB = async () => {
//     try {
//       const conn = await mongoose.connect(uri, {
//         // useUnifiedTopology: true,
//         // useNewUrlParser: true,
//         // useCreateIndex: true,
//         // useFindAndModify: false,
//       });
  
//       console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch(error) {
//       console.error(`Error Connect DB: ${error.message}`);
//       process.exit(1);
//     }
//   }
  
//   module.exports = connectDB;
module.exports =  mongoose.connect(uri)
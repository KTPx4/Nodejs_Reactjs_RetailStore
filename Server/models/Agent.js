const  mongoose =require('mongoose')

let AgentSchema = new mongoose.Schema({
    Name: String,
    Address: String,
    Description: String
})

module.exports = mongoose.model('Agent', AgentSchema)
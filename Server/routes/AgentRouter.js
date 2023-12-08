const express = require('express');
const app = express.Router()

const AgentController = require('../controllers/AgentController')
const Middleware = require('../middlewares/Agent/Validator')

app.get('/', AgentController.GetAll)

app.post("/", Middleware.Create ,AgentController.Add)

module.exports= app


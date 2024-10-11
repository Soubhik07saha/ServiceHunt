const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    age: Number,
    location: String,
    occupation: String,
    address: String
    
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = EmployeeModel
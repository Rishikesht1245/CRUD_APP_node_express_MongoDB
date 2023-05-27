const mongoose = require('mongoose')

//Connection to mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/todos")
 .then(() => {
      console.log("MongoDB connected")
 })
 .catch(() => {
      console.log("Failed to connect")
 })

 // schema for documents
 const loginSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email :{
            type:String,
            required:true
      },
      password :{
            type:String,
            required:true
      },  
 })



 const todoSchema = new mongoose.Schema({
      userId : {
            type:String,
            required:true
      },
      title:{
            type:String,
            required:true
      },
      description:{
            type:String,
            required:true
      },
      completed:{
            type:String,
            default :false
      }
 })

 //creating collection            name of the collection and schema                                         
 const users = new mongoose.model("Users", loginSchema)
 const todos = new mongoose.model("Todo", todoSchema)

 module.exports = {users,todos};
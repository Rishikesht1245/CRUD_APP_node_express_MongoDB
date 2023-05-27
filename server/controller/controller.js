const session = require('express-session');
const {users,todos} = require('../model/mongodb');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

//============================= middleware to check the if session is existing or not ================//
exports.sessionChecker = (req, res, next)=> {
      if(!req.session.userId){
            res.redirect('/')
      }else{
            next()
      }
}


//========================== inserting data to database===================================//
exports.registerUser = async (req, res) => {
      try{
            // hashing the passowrd using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const data = {
                name:  req.body.name,
                email : req.body.email,
                password : hashedPassword
            }
            const existingUser = await users.findOne({ email: req.body.email });

            if (existingUser) {
                  const messages = {
                  error: 'This email is already taken'
             };
             return res.render('register', { messages });
          }
            else{
                   //giving data to mongoDB
                await users.insertMany([data])
                console.log(data)
                res.redirect('/')
            
          }

      }
      catch(err){
            console.log(err)
            res.redirect('/register')
      }
}


//=========================== validating login credentials before login ==========================//
exports.loginUser = async (req, res)=> {
    try{
            const check = await users.findOne({email:req.body.email})
            req.session.userId = check._id;
            const userId = req.session.userId
            // comparing passwords using bcrypt.compare method
            const isValid = await bcrypt.compare(req.body.password, check.password)
            if(isValid){
                 res.redirect('/todoPage')

            } else{
                  const messages = {
                        error : "Wrong Password"
                  }
                  res.render('login',{messages} )
            }
    } catch(err){
      const message = {
            error : "Invalid details"
      }
      res.render('login',{messages:message} )
    }
}



//=============================== adding new todo to database ============================//
exports.addNewTodo = async(req, res)=> {
      try{
            userId=req.session.userId
            const data = await todos.find({userId : userId})
            const todo={
                userId: userId,
                title:  req.body.title,
                description : req.body.description
            }

            //giving data to mongoDB
            await todos.insertMany([todo])
            console.log(todo)
           
            res.redirect(`/add_todo/${userId}`)

      }
      catch(err){
            console.log(err)
            res.redirect(`/add_todo/${userId}`)
      }
}


//========================== updating existing todos ==========================//
exports.update_Todo = async(req, res) => {
      const todoId = req.params.id;
      console.log(req.body)
      console.log(todoId)
      const update = { $set: {title:req.body.title, description:req.body.description, completed:req.body.completed} };

      await todos.updateOne({_id: new ObjectId(todoId)}, update)
       .then(result => {
            console.log('Document updated successfully');
            console.log(result.modifiedCount); // Number of documents modified
            res.status(200).send('<script>alert(Data Updated Successfully!);</script>')
          })
          .catch(error => {
            console.error('Failed to update document:', error);
          });
}


//==================== delete todo ===========================//
exports.deleteTodo = async(req, res)=> {
      const todoId = req.params.id;
      console.log('Reached the delete route')

       await todos.deleteOne({_id:new ObjectId(todoId)})
       .then(result => {
            console.log("Document deleted successfully")
            console.log(result.modifiedCount)
            res.status(200).send('<script>alert(Data deleted Successfully!);</script>')
       })
       .catch(error => {
            console.error('Failed to update document' , error);
       })
}
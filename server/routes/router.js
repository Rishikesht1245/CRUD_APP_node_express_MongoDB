const express = require('express');
const router = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller')


// ================================== Get Routes ===================================//

// login page
router.get('/', services.homeRoute)

//sign up page
router.get('/register', services.registerRoute)

//homepage of user
router.get('/todoPage',controller.sessionChecker,services.TodoPage)

//login page
router.get('/login', services.loginPage)

//add todo page
router.get('/add_todo/:id',controller.sessionChecker,services.addTodo)

//update todo page
router.get('/update-user/:id',controller.sessionChecker,services.updateTodo)

// logout route to destroy the session
router.get('/logout', services.logoutUser)



// ================================== Post Routes ===================================//

// positing user details to database
router.post('/register', controller.registerUser)

//validting and login user
router.post('/login', controller.loginUser)

// adding new todo to the database
router.post('/api/todos/:id', controller.addNewTodo)


// ================================== Put Routes ===================================//

//update todo with the data
router.put('/api/todos/:id', controller.update_Todo)


// ================================== Delete Routes ===================================//

//delete todo
router.delete('/api/todo/:id', controller.deleteTodo)


module.exports = router;
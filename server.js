
const express = require('express');
const path = require('path');
// const bcrypt = require('bcrypt');// Hash the passwords plain text to string for security purpose
const app = express();
const session = require('express-session');
const nocache = require('nocache');



//middleware to handle url-encoded data in the body of a POST req and to avail it in req.body
app.use(express.urlencoded({extended:false}))

// disable caching
app.use(nocache());

// setting view engine
app.set("view engine", "ejs");

// loading assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/images")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))


// using sessions
app.use(
      session({
            key : 'user_sid',
            secret:"this is random stuff",
            resave:false,
            saveUninitialized:false,
            cookie:{
                  expires:600000   //6 days storing cookie inside browser
            }
      })
)


//load routes
app.use('/', require('./server/routes/router'));

app.listen(3000, ()=> {
      console.log("Server is running on port 3000")
})
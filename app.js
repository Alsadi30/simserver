require('dotenv').config()
const express = require('express')
const app           = express()
const db            = require('./config/database')
const setMiddleware = require("./middleware/middleware");
const passport      = require('passport')
const  path         = require('path');


app.use(express.static(path.join(__dirname, 'public')));
setMiddleware(app)

// app.get('/', (req, res) => {
//     res.send('I am ok , you should start working')
// })


require('./validator/passport')(passport);
app.use(passport.initialize())


// Routes 
app.use('/api/attachment', require('./router/attachmentRoute'))
app.use('/api/imadmin', require('./router/adminRoute'))
app.use('/api/user', require('./router/userRoute'))
app.use('/api/sim', require('./router/simRoute'))
app.use('/api/order', require('./router/orderRoute'))
app.use('/api/offers', require('./router/offerRoute'))






//Error

app.use((req, res, next) => {
  let error = new Error("404 Page not found");
  error.status = 404;
  next(error);
});

//Connection 

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
         
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
        console.log(`Server is running on port ${PORT}`)
   
})


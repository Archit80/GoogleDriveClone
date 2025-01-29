const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const connectToDB = require('./config/db');
connectToDB(); //function call

app.listen(4000,()=>{
    console.log('server started at port 4000'); 
})
    
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/user', userRouter);

const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const body_parser = require('body-parser'); 
const morgan = require('morgan');
const cors = require("cors");
dotenv.config();
require("./db");
require("./passport");

// Routes of API
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const home_page = require("./routes/home_page");

// Init
const app = express();
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(cookieParser());
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

//cors setup
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Header",
  "Origin, X-Requested-with, Content-Type, Accept, Authorizaton"
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(passport.initialize());

//init of the routes
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/food',foodRoutes);
app.use('/review',reviewRoutes);
app.use('/order',orderRoutes);
app.use('/',home_page);

//unknown error handling
app.use((req,res,next) => {
  const error = new Error("!!!!!  YOU did Something WRONG! Sorry, Try Again  !!!!!");
  error.status = 404;
  next(error);
})

app.use((error, req,res,next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

//my port
const port = 1234
app.listen(port,() => {
  console.log(`Server started at port ${port}`);
});
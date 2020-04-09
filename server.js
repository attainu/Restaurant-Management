const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const body_parser = require('body-parser'); 
const morgan = require('morgan');
dotenv.config();
require("./db");

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
  "*"
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

//init of the routes
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/food',foodRoutes);
app.use('/review',reviewRoutes);
app.use('/order',orderRoutes);
app.use('/',home_page);
require('./routes/paytmRoutes')(app)

//unknown error handling
// app.use((req,res,next) => {
//    res.json({
//     status_code: 404,
//     error: `!!!!!  YOU did Something WRONG! Sorry, Try Again  !!!!!`
//   })
// })


//my port
const port = 1234
app.listen(port,() => {
  console.log(`Server started at port ${port}`);
});
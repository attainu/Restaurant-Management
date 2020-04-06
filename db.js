const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MY Database(MY_PROJECT_DATA) HAS connected successfully"))
  .catch(() => console.log(err.message));


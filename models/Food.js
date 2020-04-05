const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipieSchema = new Schema({

  publisher:{
      // required: true, 
      type: String,
  },
  title:{
    type: String,
    // required: true,
  },
  source_url: {
    // required: true,
    type: String,
  },
  recipe_id:{
    // required: true,
    type: Number,
  },
  image_url:{
    // required: true,
    type: String,
  },
  social_rank:{
    // required: true,
    type: Number,
  },
  publisher_url:{
    // required: true,
    type: String,
  }
},{ timestamps: true },);

module.exports = mongoose.model('recipie', recipieSchema);
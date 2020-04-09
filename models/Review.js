const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_giver_name: {type: String, required:true},
    review_giver_email:{type: String, required:true},
    review_id:mongoose.Schema.Types.ObjectId,
    recepi_id: { type:mongoose.Schema.Types.ObjectId, ref: 'recipie',required:true},
    review: {type: String,default:"wow! what a food"  }
});

module.exports = mongoose.model('review', reviewSchema);
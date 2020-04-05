const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    purchaser_name: {type: String, required:true},
    purchaser_email:{type: String, required:true},
    order_id:mongoose.Schema.Types.ObjectId,
    recepi_id: { type:mongoose.Schema.Types.ObjectId, ref: 'recipie',required:true},
    Total_quantity: {type: Number, default: 1},
    TOTAL_PRICE:{type: Number, default: 102 }
});

module.exports = mongoose.model('order', orderSchema);
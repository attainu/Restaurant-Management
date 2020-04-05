const Order = require("../models/Order");
const mongoose = require('mongoose')
module.exports = {
all_orders(req,res,next){
    Order
    .find()
    .then(Order => {
        const response = {
            count: Order.length,
            recepie_order: Order.map(Order_dekho =>{
                return {
                    purchaser_name:Order_dekho.purchaser_name,
                    purchaser_email:Order_dekho.purchaser_email,
                    order_id: Order_dekho._id,
                    recepi_id:Order_dekho.recepi_id,
                    Total_quantity: Order_dekho.Total_quantity,
                    TOTAL_PRICE: Order_dekho.PRICE,
                    request : {
                        type: "GET",
                        WANT_to_see_YOUR_item_AGAIN: 'http://localhost:1234/food/' + Order_dekho.recepi_id
                    }
                }
            })
        } 
        res.status(200).json(response)
    })
    .catch(err => next(err))
},

create_order(req,res,next){
   const order =new Order({
       purchaser_name: req.body.purchaser_name,
       purchaser_email: req.body.purchaser_email,
       order_id: mongoose.Types.ObjectId(),
       recepi_id: req.body.recepi_id,
       Total_quantity: req.body.Total_quantity,
       TOTAL_PRICE: req.body.TOTAL_PRICE
    });
   order
   .save()
   .then(result => {
       console.log(result);
       res.status(201).json({
        Message: "order created successfully",   
        Result:result});
   })
   .catch(err => {
       console.log(err),
       res.status(500).json({
           error:err
        });
    });
},

particular_order(req,res,next){
    const id = req.params.orderId;
    if(id){
    Order
        .findById(id)
        .exec()
        .then(order => {
            if(!order){
                return res.status(404).json({
                    message: 'sorry order not found'
                })
            }
            res.status(200).json(order)} )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request'
        });
    }
},

order_updated(req,res,next){
        const {
          orderId,
        } = req.params;
      
        Order
          .findByIdAndUpdate(orderId, req.body)
          .exec()
          .then((order) => res.json({
              message: "order UPDATED successfully",
              order : order
              }))
          .catch(err => next(err));
},

order_Deleted(req,res,next){
    const {
        orderId,
      } = req.params;
    
      Order
        .findByIdAndDelete(orderId, req.body)
        .exec()
        .then(() => res.json({
            success: true,
            message: "SUCCESSFULLY deleted the order item"
          }))
        .catch(err => next(err));
}

};

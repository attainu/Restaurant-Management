const Review = require("../models/Review");
const mongoose = require('mongoose')

module.exports = {
all_reviews(req,res,next){
    Review
    .find()
    .then(review => {
        const response = {
            count: review.length,
            recepie_review: review.map(review_dekho =>{
                return {
                    Review:review_dekho.review,
                    Review_id: review_dekho._id,
                    Review_giver_name:review_dekho.review_giver_name,
                    // Review_giver_email:review_dekho.review_giver_name,
                    Recepi_id:review_dekho.recepi_id,
                    Request : {
                        type: "GET",
                        WANT_To_See_THIS_FOOD_: 'http://localhost:1234/food/' + review_dekho.recepi_id
                    }
                }
            })
        } 
        res.status(200).json(response)
    })
    .catch(err => next(err))
},
create_review(req,res,next){
    const review =new Review({
        review_giver_name: req.body.review_giver_name,
        review_giver_email: req.body.review_giver_email,
        review_id: mongoose.Types.ObjectId(),
        recepi_id: req.body.recepi_id,
        review: req.body.review
     });
    review
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
         Message: "review created successfully",   
         Result:result});
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error:err
         });
     });
 },
particular_review(req,res,next){
    const id = req.params.reviewId;
    if(id){
    Review
        .findById(id)
        .exec()
        .then(review => {
            if(!review){
                return res.status(404).json({
                    message: 'sorry review not found'
                })
            }
            res.status(200).json(review)} )
        .catch(err => next(err));
}else{
        res.status(400).json({
            message: 'sorry! Bad Request'
        });
    }
},

review_updated(req,res,next){
    const {
        reviewId,
      } = req.params;
    
      Review
        .findByIdAndupdate(reviewId, req.body)
        .exec()
        .then(() => res.json({
            success: true,
            message: "SUCCESSFULLY Updated the review "
          }))
        .catch(err => next(err));
},

review_Deleted(req,res,next){
    const {
        reviewId,
      } = req.params;
    
      Review
        .findByIdAndDelete(reviewId, req.body)
        .exec()
        .then(() => res.json({
            success: true,
            message: "SUCCESSFULLY deleted the review "
          }))
        .catch(err => next(err));
}

};

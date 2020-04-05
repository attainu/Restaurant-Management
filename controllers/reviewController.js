const review = require("../models/review");

module.exports = {
    all_reviews(req,res,next){
        res.status(200).json({
            message:'all reviews'
        });
},
review_delevery(req,res,next){
    res.status(200).json({
        message:'review response '
    });
},
particular_review(req,res,next){
    const id = req.params.reviewId;
    if(id === 'special'){
        res.status(200).json({
            message: 'you discovered the specialId',
            id : id
        });
}else{
        res.status(200).json({
            message: 'You Passed JUST a ID'
        });
    }
},

review_updated(req,res,next){
    res.status(200).json({
    message: 'review updated'
})
},

review_Deleted(req,res,next){
    res.status(200).json({
    message: 'review Deleted'
})
}

};

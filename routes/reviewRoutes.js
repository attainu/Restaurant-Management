const express = require('express');
const router = express.Router();

const {
    all_reviews,
    create_review,
    particular_review,
    review_updated,
    review_Deleted
  } = require("../controllers/reviewController");

router.get('/',all_reviews);

router.post('/create_review',create_review);

router.get('/:reviewId',particular_review);

router.patch('/:reviewId',review_updated);

router.delete('/:reviewId',review_Deleted);

module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { ListingSchema, ReviewSchema } = require("../schema.js");
const review = require("../models/reviews.js");
const listing = require("../models/listings.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewControl=require("../controllers/reviews.js");


//post route of review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControl.newReview));

//delete route for review
router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(reviewControl.deleteReview));

module.exports = router;
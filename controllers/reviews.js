const review = require("../models/reviews.js");
const listing = require("../models/listings.js");

module.exports.newReview=async (req, res) => {
    let { _id } = req.params;
    let Listing = await listing.findById(_id);
    let newreview = new review(req.body.review);
    newreview.author = req.user._id;

    Listing.reviews.push(newreview);

    await newreview.save();
    await Listing.save();
    req.flash("success", "New review created successfully");
    res.redirect(`/listings/${_id}`);
}

module.exports.deleteReview=async (req, res) => {
    let { _id, reviewid } = req.params;
    await review.findByIdAndDelete(reviewid);
    await listing.findByIdAndUpdate(_id, { $pull: { reviews: reviewid } });

    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${_id}`);
}

const Listing = require("./models/listings.js");
const expressError = require("./utils/expressError.js");
const { ListingSchema, ReviewSchema } = require("./schema.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in");
        res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { _id } = req.params;
    let listing = await Listing.findById(_id);
    if (!(listing.owner.equals(res.locals.currUser._id))) {
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${_id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = ListingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = ReviewSchema.validate(req.body.review);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { _id, reviewid } = req.params;
    let review = await Review.findById(reviewid);
    if (!(review.author.equals(res.locals.currUser._id))) {
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/listings/${_id}`);
    }
    next();
};


const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const review = require("../models/reviews.js");
const listing = require("../models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControl = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get(wrapAsync(listingControl.index))
    .post(isLoggedIn,upload.single("list[image]"), validateListing, wrapAsync(listingControl.newlisting));


//new route
router.get("/new", isLoggedIn, listingControl.renderNewPage);

//home route
router.get("/home", (req, res) => {
    res.redirect("/listings");
});


router.route("/:_id")
    .get(wrapAsync(listingControl.rendershowListing))
    .put(isLoggedIn, isOwner,upload.single("list[image]"), validateListing, wrapAsync(listingControl.updateListing));



//edit route
router.get("/:_id/edit", isLoggedIn, wrapAsync(listingControl.rendereditListing));



//delete route
router.get("/:_id/delete", isLoggedIn, isOwner, wrapAsync(listingControl.deleteListing));

module.exports = router; 
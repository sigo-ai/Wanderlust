const Listing = require("../models/listings.js");
const apiKey = process.env.MAP_API_KEY;

module.exports.index = async (req, res) => {
    const alllistings = await Listing.find();
    res.render("./listings/index.ejs", { alllistings });
};

module.exports.renderNewPage = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.rendershowListing = async (req, res) => {
    
    let { _id } = req.params;
    // let list=await Listing.findById(_id);
    // const address = list.location;
    // const url2 = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    // const response = await fetch(url2);
    // const data = await response.json();
    // list.geometry=data.features[0].geometry;

    // await list.save();
    // res.send("hii");
    let list = await Listing.findById(_id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!list) {
        req.flash("error", "Listing doesn't Exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { list });
};

module.exports.newlisting = async (req, res) => {
    const address = req.body.list.location
    const url2 = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    const response = await fetch(url2);
    const data = await response.json();
    
    let url = req.file.path;
    let filename = req.file.filename;

    const newlisting = new Listing(req.body.list);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    newlisting.geometry=data.features[0].geometry;
    await newlisting.save();

    req.flash("success", "New listing created successfully");
    console.log("posted successfully");
    res.redirect("/listings");
}

module.exports.rendereditListing = async (req, res) => {
    let { _id } = req.params;
    let listings = await Listing.findById(_id);
    if (!listings) {
        req.flash("error", "Listing doesn't Exist");
        res.redirect("/listings");
    }

    let originalImageUrl = new URL(listings.image.url);
    // console.log(originalImageUrl);
    // originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_100/")
    // console.log(originalImageUrl);

    let width=250;
    originalImageUrl.searchParams.set('w', width);

    originalImageUrl.toString();

    res.render("./listings/edit.ejs", { listings, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { _id } = req.params;
    let listing = await Listing.findByIdAndUpdate(_id, { ...req.body.list });

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "listing edited successfully");
    res.redirect(`/listings/${_id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { _id } = req.params;
    await Listing.findByIdAndDelete(_id);
    req.flash("success", "listing deleted successfully");
    res.redirect("/listings");
}
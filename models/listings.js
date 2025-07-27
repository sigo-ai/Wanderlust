const mongoose = require("mongoose");
const reviews = require("./reviews");
const users = require("./users");
// const { object, ref } = require("joi");
const Schema = mongoose.Schema;


const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        } 
    }
})

listingschema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await reviews.deleteMany({ _id: { $in: listing.reviews } });
    }
})
const listing = mongoose.model("listing", listingschema);
module.exports = listing;

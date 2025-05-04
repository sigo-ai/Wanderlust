const mongoose=require("mongoose");
const { min, max } = require("../schema");
const { required } = require("joi");
const Schema=mongoose.Schema;
const users=require("./users");

const reviewsSchema=new Schema({
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const review=mongoose.model("review",reviewsSchema);

module.exports = review;
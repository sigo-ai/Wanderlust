const Joi = require("joi");

const ListingSchema=Joi.object({
    list: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
    }).required(),
});

const ReviewSchema=Joi.object({
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().required()
}).required();

module.exports = { ListingSchema, ReviewSchema };
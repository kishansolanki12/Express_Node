const cart = require('../models/cart.model.js');

module.exports = class CartServices {
    // add to carts
    async addToCart (body){
        try {
            return await cart.create(body);
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    // get cart
    async grtCart (body){
        try {
            return await cart.findOne(body);
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    // get all cart
    async grtAllCart (body){
        try {
            return await cart.find(body).populate('cartItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
        // update cart
    async updateCart(id, body) {
        try {
            return await cart.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };


};
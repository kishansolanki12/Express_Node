const CartServices = require('../services/cart.service.js');
const cartService = new CartServices();

exports.addNewCart = async (req, res) => {
    try {
        let cart = await cartService.grtCart({ cartItem: req.body.cartItem, user: req.user._id, isDelete: false });
        if (cart) {
            return res.json({ message: 'Cart Item alrady exits.....' });
        }
        cart = await cartService.addToCart({
            ...req.body, user: req.user._id
        })
        res.json({ cart, message: 'Cart Added Sucsess' });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Internal server error' });
    }
};

exports.getAllCart = async (req, res) => {
    try {
        let carts = await cartService.grtAllCart({ user: req.user._id, isDelete: false });
        res.json(carts);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Internal Server  Error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        let cart = await cartService.grtCart({user: req.user._id});
        console.log(cart);
        if(!cart){
            return res.json({message: 'Items is Not Found'});
        }
        let id = cart._id;
        // console.log("item Id => ",id);
        let userId = cart.user;
        // console.log(userId);
        let cartId = cart.cartItem;
        // console.log("cartID =>",cartId);
        cart = await cartService.updateCart(cart._id,req.body);
        res.json({cart ,message: "Cart Updated sucessfully"});
    } catch (error) {
        console.log(error);
        return res.json({message : "Internal server error From:controller"});
    }
};    

    exports.deleteCart = async (req, res) => {
        try {
            let cart = await cartService.grtCart({user: req.user._id,isDelete: false});
            console.log(cart);
            if(!cart){
                return res.json({message: 'Items is Not Found'});
            }
            let id = cart._id;
            // console.log("item Id => ",id);
            let userId = cart.user;
            // console.log(userId);
            let cartId = cart.cartItem;
            // console.log("cartID =>",cartId);
            cart = await cartService.updateCart(req.body.cartid,{isDelete: true});
            res.json({cart ,message: "Cart Delete sucessfully"});
        } catch (error) {
            console.log(error);
            return res.json({message : "Internal server error From:controller"});
        }
};


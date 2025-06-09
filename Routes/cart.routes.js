import express from "express"
import { Router } from "express";
import { addToCart, clearCart, decreaseProudctQty, removeProductFromCart, userCart } from "../Controllers/Cart.controller.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router=express.Router();

// addto cart api
router.post("/add",Authenticated ,addToCart)

// get User Cart
router.get("/user", userCart);

// // remove product from cart
router.delete("/remove/:productId",Authenticated ,  removeProductFromCart);

// // clear cart
router.delete("/clear",Authenticated ,  clearCart);

// // decrease items qty
router.post("/--qty",Authenticated ,decreaseProudctQty);// here we can also use put

export default router


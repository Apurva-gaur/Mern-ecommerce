import express from "express"
import { Router } from "express";
import { addProduct, getProductById, getProducts, updateProductById } from "../Controllers/Product.controller.js";

const router=express.Router()

//add productApi
router.post("/add",addProduct);
// get product
router.get('/all',getProducts)

// // get product by Id
router.get('/:id',getProductById)

// // update product by Id
router.put('/:id',updateProductById)// for update the product it will update the product field in which i have to send all fields

// // delete product by Id
// router.delete('/:id',deleteProductById)


export default router

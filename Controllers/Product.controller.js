import mongoose from "mongoose";
import { Products } from "../Models/Product.js";

//create user in db
export const addProduct=async(req,res)=>{
    const {title,description,price,category,qty,imgSrc}=req.body
     try {
        let product = await Products.create({
          title,
          description,
          price,
          category,
          qty,
          imgSrc,
        });
        res.json({message:'Product added successfully...!',product})
        
    } catch (error) {
        res.json(error.message)
    }



}
//get product all
export const getProducts= async(req,res)=>{
    let products=await Products.find().sort({createdAt:-1});// get the recent add product on top
    res.json({message:"getAll the product success ",products})


}
//get product by id
export const getProductById= async(req,res)=>{
    const id =req.params.id //
    let product=await Products.findById(id)// get the recent add product on top
    if(!product){
        res.json({message:"invalid id"})
    }
    res.json({message:"specific product",product})

}

// update the product
export const  updateProductById= async(req,res)=>{
    const id =req.params.id //
    let product = await Products.findByIdAndUpdate(id,req.body,{new:true})// update the product by id
    if(!product){
        res.json({message:"invalid id"})
    }
    res.json({message:"product has been updated",product})

}


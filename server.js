console.log("mern server");
import express from "express"
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./Routes/user.routes.js"
import productRouter from "./Routes/product.routes.js"
import cartRouter from "./Routes/cart.routes.js"
import addressRouter from './Routes/address.routes.js'

import bodyParser from "express"

const app=express();
app.use(bodyParser.json())
app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))
const port=3000;
app.listen(port,()=>console.log("server is running on port 3000"));
mongoose.connect("mongodb+srv://apurva:Apurva123@cluster0.1ravchb.mongodb.net/",{dbName:"E-com"}).then(()=>console.log("Mongobd connected")).catch((error)=>console.log(error))
// home route
app.get("/",(req, res)=>res.json({message:"server is seving in home route"}))
// userRouter
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)

import express from "express"
import { Router } from "express";
import { loginUser, profile, registerUser, users } from "../Controllers/User.controller.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router=express.Router();
//creating Api for registering user
router.post("/register",registerUser)
// login Api
router.post("/login",loginUser)// api/user/login
// all user routes
router.get("/users",users)

// get user profile
router.get("/profile", Authenticated, profile);




export default router


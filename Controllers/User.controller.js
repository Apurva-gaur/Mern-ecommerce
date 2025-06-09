import mongoose from "mongoose";
import { User } from "../Models/Users.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

// creating new user

export const registerUser=async (req, res, next)=>{
    const {username,email,password}=req.body;
    
    try{
        // before creating user find by email if user is exist or not
        let user=await User.findOne({email})// this return the whole exsited user
        if(user)
        {
         res.json({message:"user Already existed",success:false,user})
        }
        // if user is not exist then before saving data hash the pasword
        const hashPass= await bcrypt.hash(password,10)

        //storingthe data
        user=await User.create({username,email,password:hashPass});
        res.json({message:"user resgister successfully",success:true,user})

    }
    catch(error){
        res.json({message:error.message})
    }

    }
// for login user
export const loginUser=async(req,res,next)=>{
    const { email,password}=req.body
    try{
         let user=await User.findOne({email})
    if(!user)
        {
           return res.json({message:"user is not found in database",success:false})// here returning  bcsz we dont want further lines executed
        }    
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword)
    {
        return res.json({message:"Invalid credendials",success:false})
    }
     const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
      expiresIn:'365d'
    })
    // if credials are valid then let user login
    res.json({message:`welcome ${user.username},you have logged succussfully`,success:true,token})
    }
    catch(error){
        res.json({message:error.mesage})

    }
   

}   
// get All the user
export const users=async(req,res,next)=>{
    try {
        let users=await User.find().sort({createdAt:-1})// get the all recent created users
        res.json(users)
    } catch (error) {
        res.json(error.message)
        
    }
} 

// get user profile
export const profile = async (req,res)=>{
  const user=req.user
  res.json({user})
}

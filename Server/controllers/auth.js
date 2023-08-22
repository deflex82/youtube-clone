import mongoose from "mongoose"
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
export const signup = async(req,res,next)=>{
    try{

        const salt = await bcrypt.genSalt();
        console.log(req.body.password);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        console.log(hashedPassword)



        const newuser =await new User(
            {
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            }
        );

        await newuser.save();

        res.status(200).json("User has been created");




    }

    catch(err){
        next(err);


    }


}


export const signin = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            name:req.body.name
        });
        if(!user){
            return next(createError(404,"User not found"))
        }
        const isCorrect = await bcrypt.compare(req.body.password,user.password);

        if(!isCorrect){
            return next(createError(400,"Wrong Crednentials"));
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);


        const {password,...others} = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(others);

        


    }
    catch(err){
        next(err);

    }
}


export const googleAuth =  async(req,res,next)=>{
    try{

        const user = await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json(user._doc);
    
            

        }
        else{
            const newUser = await  User({
                ...req.body,
                fromGoogle:true
            })

            const saveduser = await newUser.save();

            const token = jwt.sign({id:saveduser._id},process.env.JWT_SECRET);

            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json(saveduser._doc);
        }

    }
    catch(err){
        next(err);

    }
}
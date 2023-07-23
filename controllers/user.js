import {user} from "../models/user.js"
import bcrypt from 'bcrypt' // encrypting the user password
import {setToken} from '../utils/setToken.js'
import ErrorHandler from "../middleware/errorhandler.js";



//todo  ********** showall *********
export const showall = async(req,res)=>{
   const findall = await user.find({});
   res.json({
     findall,
   })
}


//todo  ********** register *********
export const register = async(req,res,next)=>{
  try{
 const {name,email,password} =req.body;
 const hashpassword = await bcrypt.hash(password,10);
 await user.create({
  name,
  email,
  password:hashpassword,
})
 res.status(201).json({
  success:true,
  message:"new user is created successfully",
 })
}
catch(error){
 next(error)
}
}


//todo  ********** login *********
export const login =async(req,res,next)=>{
  try{
   const {email,password} = req.body;
   const isuser = await user.findOne({email}).select("+password");
   /*as due to select property we can't directly access the password,
    due to which we have to find email also with password*/ 

    if(isuser){
     const isMatch = await bcrypt.compare(password,isuser.password);
     console.log(isMatch);
     if(isMatch){
      let message = `Hi,${isuser.name} Happy to see you back.`
         setToken(isuser,res,message); 
     } 
     else{
      return next(new ErrorHandler("password incorrect",501));
      // return res.status(501).json({
      //    success: false,
      //    message: "password incorrect",
      //  })
     }
    }
    else{
      return next(new ErrorHandler("user does not exit",404));
    }
} catch(error){
  next(error);
}
}


//todo  ********** logout *********
export const logout = async(req,res,next)=>{
  try{
  const {token} =req.cookies;
  if(token){
 await res.cookie("token","",{
  expires:new Date(Date.now()),
 });

 return res.status(201).json({
   success: true,
   message: "successfully logout",
 })

}
else{
  return next(new ErrorHandler("Invalid User",505));
  // return res.status(505).json({
  //   success: false,
  //   message: "Invalid user",
  // })
}
}catch(error){
  next(error);
}
}


//todo  ********** detail *********
export const detail = async(req,res)=>{
  res.json({
    success:true,
    user:req.user,
   })
}

import {User} from "../models/user.js"
import jwt from 'jsonwebtoken' // use to encrypt the user_id before passing it as cookies in browser.
import ErrorHandler from "./errorhandler.js";


export const isAuthenticated = async(req,res,next)=>{
  try{
 const {token} =req.cookies;
//  console.log(token);
 if(token){
  const decoded =jwt.verify(token,process.env.JWT_SECRET);
  // console.log(decoded._id);
 req.user = await User.findById(decoded._id);
 next();
}
else{
  return next(new ErrorHandler("Login First",404));
}
}catch(error){
  next(error);
}
}

import jwt from "jsonwebtoken"


export const setToken = (isuser,res,message)=>{
const token =jwt.sign({_id:isuser._id},process.env.JWT_SECRET); // encrypting the user_id before passing it as cookies with developer predefine "JWT_SECRET"

res.status(201).cookie("token",token,{
  httpOnly:true,
  maxAge:15*60*1000,
  //strict mode =Cookies will only sent in a frist-party context and not be sent by third part website.
  sameSite:"none", //as in our case our backend url and front url is not same
  secure: true  // if we not true if than cookies will be blocked will deploying.
  //! set sameSite:"lax" and secure:false while running it in local host.

 }).json({
 success:true,
 message,
  })
};
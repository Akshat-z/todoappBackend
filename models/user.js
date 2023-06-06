import mongoose from 'mongoose';

const schema = mongoose.Schema({
 name :{
  type:String,
  require:[true],
 },
 email:{
  type:String,
  require:[true],
  unique:[true], // no dublicate data
 },
 password:{
  type:String,
  require:[true],
  select:[false], // means data will store buy not visible in database and we can not directly access it.
 },
 createdAt:{
  type:Date,
  default:Date.now,
 }
})

export const user = mongoose.model("user",schema);
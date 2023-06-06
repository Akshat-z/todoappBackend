import mongoose from 'mongoose';

const schema = mongoose.Schema({
 title :{
  type:String,
  require:true,
 },
 description:{
  type:String,
  require:true,
 },
 isCompleted:{
   type:Boolean,
   default:false,
 },
 createdBy:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"user"
 }
})

export const task = mongoose.model('task',schema);
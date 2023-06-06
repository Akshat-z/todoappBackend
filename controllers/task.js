import ErrorHandler from "../middleware/errorhandler.js";
import {task} from "../models/task.js"



//todo ************ newTask *************
export const newTask = async(req,res,next) =>{
  try{
   const {title,description} = req.body;
 await task.create({
   title,
   description,
   createdBy:req.user._id,
 })
   res.status(201).json({
    success:true,
    message:"Task added successfully",
    user:req.user
   }) 
} catch(error){
  next(error);
}
}


//todo ************ getMyTask *************
export const getMyTask = async (req, res, next) => {
  try{
   const tasks = await task.find({ createdBy:req.user._id});
   res.status(200).json({
     success: true,
     tasks,
   });
 } catch(error){
  next(error);
 }
}


//todo ************ updateTask *************
 export const updateTask = async(req,res,next) =>{
  try{
  const findTask =await task.findById(req.params.id);
   if(!findTask) return next(new ErrorHandler("Task is not present",404)); 
  findTask.isCompleted=!findTask.isCompleted
   await findTask.save();
   res.status(201).json({
    message:"Your task has been updated successfully"
   })
 } catch(error){
  next(error);
 }
 }


//todo ************ deleteTask *************
 export const deleteTask = async(req,res,next)=>{
  await task.findByIdAndDelete(req.params.id);
  res.status(201).json({
    message:"Your task has been deleted successfully"
   })
 }
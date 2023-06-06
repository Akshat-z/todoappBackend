import express from 'express'
import {deleteTask, getMyTask, newTask, updateTask} from '../controllers/task.js'
import { isAuthenticated } from '../middleware/authentic.js';

const router = express.Router();

//!both new and me is also :id but concept of priority.

router.post("/new",isAuthenticated,newTask)

router.get("/me",isAuthenticated,getMyTask)

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router;
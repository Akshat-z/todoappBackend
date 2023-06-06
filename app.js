import express from 'express'
import userrout from './routes/user.js'
import taskrout from "./routes/task.js"
import cookieParser from 'cookie-parser'; // to access cookies out of function or in another function.
import {config} from 'dotenv'
import cors from 'cors' //(Cors-Origin Resource Sharing) to make url of frontend and backend similar so that it can follow browser protocol
import {errorMiddleware} from "./middleware/errorhandler.js"

 config({
  path:'./data/config.env',
 })
 
export const app=express();

// middleware
app.use(express.json());
app.use(cors({
  origin:[process.env.FRONTEND_URL], // deploy url
  methods:["GET","POST","PUT","DELETE"],
  credentials: true, //frontend me sare header pahuche like cookies etc uske liye credentials ko true rakhna hai.
}))
app.use(cookieParser());
app.use("/api/v1/user",userrout);
app.use("/api/v1/task",taskrout);


app.get("/",(req,res)=>{
 res.send("Good to see you");
})

app.use(errorMiddleware);

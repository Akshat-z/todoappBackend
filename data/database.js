import mongoose from "mongoose"

export const connect=()=>{mongoose.connect(process.env.MONGO_URL,{
 dbName: "todoDB",
}).then(()=>console.log("Data base is connected")).catch((e)=>console.log(e));
}

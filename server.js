import {app} from "./app.js"
import { connect } from "./data/database.js";

connect();

app.listen(process.env.PORT,()=>{
 console.log("Server is working");
})

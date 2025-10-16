import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const  __dirname = path.resolve();

// middleware
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


// make ready for deployment 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_,res ) => { // if we get any URL except the above go ahead and serve this 
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}



app.listen(PORT, (req,res) => {
    console.log(`Server is running at port ${PORT}`);
    connectDB();
})
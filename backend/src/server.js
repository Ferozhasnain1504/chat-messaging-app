import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(PORT, (req,res) => {
    console.log(`Server is running at port ${PORT}`);
})
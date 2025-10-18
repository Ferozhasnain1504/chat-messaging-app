import express from "express";
import { signup,login,logout,updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// runs first for rate limiting in all endpoints /signup, /login, /logout etc
router.use(arcjetProtection);

router.post("/signup", signup);

router.post("/login",login);

router.post("/logout", logout);

// protectRoute authenticates the user only then updateProfile is called 
router.put("/update-profile", protectRoute, updateProfile);

// if user refreshes the pages check for authentication again
router.get("/check", protectRoute, (req,res) => res.status(200).json(req.user));

export default router;
import express from "express";
import { getAllContacts, getMessageByUserId, sendMessage,getPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js"

const router = express.Router();

// The middleware execute in order - so requests get rate limited first, then authenticated. 
router.use(arcjetProtection, protectRoute);
 
router.get("/contacts", getAllContacts);
router.get("/chats", getPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router

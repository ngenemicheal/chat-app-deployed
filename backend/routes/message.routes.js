import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getMessage);
router.post("/send/:id", verifyToken, sendMessage);

export default router;
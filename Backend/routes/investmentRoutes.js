import express from "express";
import { createInvestment, getUserInvestments } from "../controllers/investmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 

const router = express.Router();


router.post("/", authenticate, createInvestment);


router.get("/:userId", authenticate, getUserInvestments);

export default router;

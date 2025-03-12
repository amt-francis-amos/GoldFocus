import express from "express";
import { createInvestment } from "../controllers/investmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 

const router = express.Router();


router.post("/", authenticate, createInvestment);

export default router;

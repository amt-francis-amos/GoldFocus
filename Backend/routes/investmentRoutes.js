import express from "express";
import { createInvestment, getUserInvestments, holdInvestment } from "../controllers/investmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/", authenticate, createInvestment);
router.put("/:id/hold", holdInvestment);
router.get("/:userId", authenticate, getUserInvestments);

export default router;

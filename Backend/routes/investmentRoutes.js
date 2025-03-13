import express from "express";
import { 
  createInvestment, 
  getUserInvestments, 
  holdInvestment,
  resumeInvestment
} from "../controllers/investmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/", authenticate, createInvestment);
router.put("/:id/hold", authenticate, holdInvestment);
router.put("/:id/resume", authenticate, resumeInvestment); 
router.get("/", authenticate, getUserInvestments); 

export default router;

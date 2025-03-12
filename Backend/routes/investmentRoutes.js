import express from "express";
import { 
  createInvestment, 
  getUserInvestments, 
  holdInvestment 
} from "../controllers/investmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/", authenticate, createInvestment);
router.put("/:id/hold", authenticate, holdInvestment);
router.get("/", authenticate, getUserInvestments); 

export default router;

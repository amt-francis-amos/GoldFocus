import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import connectDB from './config/mongoDb.js'; 
import userRoutes from './routes/userRoutes.js'; 
import investmentRoutes from "./routes/investmentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 


app.use('/api/users', userRoutes);
app.use("/api/investments", investmentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

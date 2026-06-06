import express from 'express';
import cors from "cors";
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173",
     "https://resume-builder-frontend-ruby.vercel.app/"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => res.send("Server is live.."));
app.get('/api/health', (req, res) => res.send("OK"));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 3000;

//  Add this at the bottom
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
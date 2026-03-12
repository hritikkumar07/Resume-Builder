import express from 'express';
import cors from "cors";
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();

// CORS - no trailing slash
app.use(cors({
  origin: "https://resume-builder-frontend-ruby.vercel.app",
  credentials: true
}));

app.use(express.json());

//  Only DB connection inside async function
const startServer = async () => {
  await connectDB();
};

startServer();

// Routes OUTSIDE startServer()
app.get('/', (req, res) => res.send("Server is live.."));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

export default app;
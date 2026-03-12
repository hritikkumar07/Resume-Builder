// import express from 'express';
// import cors from "cors";
// import "dotenv/config";
// import connectDB from './configs/db.js';
// import userRouter from './routes/userRoutes.js';
// import resumeRouter from './routes/resumeRoutes.js';
// import aiRouter from './routes/aiRoutes.js';


// const app = express();
// const PORT = process.env.PORT || 3000;

// // database connection
// await connectDB()




// app.use(express.json())
// app.use(cors({
//       origin: "http://localhost:5173", 
//       credentials: true

// }))

// app.get('/', (req,res)=>res.send("Server is live.."))
// app.use('/api/users',userRouter)
// app.use('/api/resumes',resumeRouter)
// app.use('/api/ai',aiRouter)

// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
    
// });

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

//  Connect DB inside a function, not top-level await
const startServer = async () => {
  await connectDB();

  app.get('/', (req, res) => res.send("Server is live.."));
  app.use('/api/users', userRouter);
  app.use('/api/resumes', resumeRouter);
  app.use('/api/ai', aiRouter);
};

startServer();

export default app;

import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import instructorRoutes from './routes/instructor.routes';
import studentRoutes from './routes/student.routes'
import chatRoutes from './routes/chat.routes'
import cors from 'cors';
import session from 'express-session';
import path from 'path'



const { initializeSocket } = require('./socket.js');
import {createServer} from 'http';
import 'dotenv/config';


const app = express();
const url = process.env.MONGO_URL;

const server = createServer(app)

// Middleware
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor',instructorRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/chat',chatRoutes)
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  }
});



mongoose.connect('mongodb+srv://suneeshcotkm:rAa9dkCaaDMCwvnS@eduzone.d3zjqpx.mongodb.net/Eduzone?retryWrites=true&w=majority&appName=Eduzone').then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

//socket server
initializeSocket(server);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

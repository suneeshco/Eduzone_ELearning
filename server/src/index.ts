import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import instructorRoutes from './routes/instructor.routes';
import studentRoutes from './routes/student.routes'
import cors from 'cors';
import session from 'express-session';
require('dotenv').config();


const app = express();

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



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor',instructorRoutes);
app.use('/api/student',studentRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/eduz').then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

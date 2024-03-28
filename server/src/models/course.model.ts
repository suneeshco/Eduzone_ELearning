import mongoose, { Schema, Document } from 'mongoose';

export interface Course {
  courseName : string;
  courseDuration : string;
  courseFee : number;
  courseDescription : string;
  category : string;
  imageUrl : string;
  instructorId : string;
  createdAt:Date;

}

export interface CourseDocument extends Course, Document {}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  courseDuration: { type: String},
  courseFee: { type: Number, required: true },
  courseDescription: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model<CourseDocument>('Course', CourseSchema);
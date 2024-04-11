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
  students : string[];
  rating : number;
  isApproved : boolean;
}

export interface CourseDocument extends Course, Document {}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true },
  courseDuration: { type: String},
  courseFee: { type: Number, required: true },
  courseDescription: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  students:[{type: String}],
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating : {type: Number , default:0},
  createdAt: { type: Date, default: Date.now },
  isApproved:{type: Boolean , default : false}
});


export default mongoose.model<CourseDocument>('Course', CourseSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface Rating {
  courseId: string;
  studentId: mongoose.Schema.Types.ObjectId;
  rating: number;
  review : string;
  createdAt: Date;
}

export interface RatingDocument extends Rating, Document {}

const RatingSchema: Schema = new Schema({
  courseId: { type: String },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  review:{type: String},
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<RatingDocument>('Rating', RatingSchema);

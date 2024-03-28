

import mongoose, { Schema, Document } from 'mongoose';

export interface Instructor {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  status: boolean;
  photo : string;
  role : string;
}

export interface InstructorDocument extends Instructor, Document {}

const InstructorSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  mobile: {type: String},
  password: { type: String, required: true },
  status: {type: Boolean, default:true},
  photo : {type: String},
  role : {type: String}
});

export default mongoose.model<InstructorDocument>('Instructor', InstructorSchema);

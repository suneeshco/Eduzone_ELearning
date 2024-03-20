

import mongoose, { Schema, Document } from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  status: boolean;
  photo: string;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  mobile: {type: String},
  password: { type: String, required: true },
  status: {type:Boolean, default:true},
  photo: {type:String}
});

export default mongoose.model<UserDocument>('User', UserSchema);

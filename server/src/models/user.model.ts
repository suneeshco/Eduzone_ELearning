

import mongoose, { Schema, Document } from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  status: boolean;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: {type: String,required : true},
  password: { type: String, required: true },
  status: {type:Boolean, default:true}
});

export default mongoose.model<UserDocument>('User', UserSchema);
